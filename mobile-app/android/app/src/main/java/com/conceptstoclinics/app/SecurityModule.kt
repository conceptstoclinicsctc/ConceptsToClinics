package com.conceptstoclinics.app

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorManager
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.util.Locale

class SecurityModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "SecurityModule"

    @ReactMethod
    fun isEmulator(promise: Promise) {
        try {
            val result = checkIsEmulator()
            promise.resolve(result)
        } catch (e: Exception) {
            // Fail secure: if detection encounters an unexpected error, resolve false
            promise.resolve(false)
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun isEmulatorSync(): Boolean {
        return checkIsEmulator()
    }

    /**
     * Comprehensive multi-layer emulator detection.
     */
    private fun checkIsEmulator(): Boolean {
        if (checkBuildProperties()) return true
        if (checkPipesAndDrivers()) return true
        if (checkEmulatorFiles()) return true
        if (checkCpuInfo()) return true
        if (checkSensors()) return true
        return false
    }

    /**
     * Layer 1: Heuristic checks across Android Build properties.
     */
    private fun checkBuildProperties(): Boolean {
        val fingerprint = Build.FINGERPRINT.lowercase(Locale.ROOT)
        val model = Build.MODEL.lowercase(Locale.ROOT)
        val manufacturer = Build.MANUFACTURER.lowercase(Locale.ROOT)
        val hardware = Build.HARDWARE.lowercase(Locale.ROOT)
        val product = Build.PRODUCT.lowercase(Locale.ROOT)
        val board = Build.BOARD.lowercase(Locale.ROOT)
        val brand = Build.BRAND.lowercase(Locale.ROOT)
        val device = Build.DEVICE.lowercase(Locale.ROOT)
        val bootloader = Build.BOOTLOADER.lowercase(Locale.ROOT)
        val host = Build.HOST.lowercase(Locale.ROOT)

        return fingerprint.startsWith("generic")
                || fingerprint.startsWith("unknown")
                || fingerprint.contains("test-keys")
                || fingerprint.contains("vbox")
                || fingerprint.contains("sdk_gphone")
                || model.contains("google_sdk")
                || model.contains("emulator")
                || model.contains("android sdk built for")
                || model.contains("droid4x")
                || model.contains("tiandi")
                || model.contains("vbox86")
                || model.contains("subsystem for android")
                || model.contains("bluestacks")
                || model.contains("nox")
                || model.contains("ttvm")
                || model.contains("mumu")
                || manufacturer.contains("genymotion")
                || manufacturer.contains("unknown")
                || manufacturer.contains("bluestacks")
                || manufacturer.contains("bignox")
                || manufacturer.contains("nox")
                || manufacturer.contains("tencent")
                || manufacturer.contains("microvirt")
                || manufacturer.contains("microsoft")
                || hardware.contains("goldfish")
                || hardware.contains("ranchu")
                || hardware.contains("vbox86")
                || hardware.contains("nox")
                || hardware.contains("bst")
                || hardware.contains("android_x86")
                || hardware.contains("ttvm")
                || product.contains("sdk")
                || product.contains("google_sdk")
                || product.contains("sdk_gphone")
                || product.contains("sdk_x86")
                || product.contains("vbox86")
                || product.contains("emulator")
                || product.contains("simulator")
                || product.contains("nox")
                || product.contains("bluestacks")
                || product.contains("subsystem")
                || board.contains("nox")
                || board.contains("goldfish")
                || board.contains("vbox")
                || bootloader.contains("nox")
                || brand.startsWith("generic")
                || brand.startsWith("generic_x86")
                || brand.contains("google_sdk")
                || (brand.startsWith("generic") && device.startsWith("generic"))
                || device.startsWith("generic_x86")
                || device.startsWith("vbox86")
                || device.contains("emulator")
                || host.startsWith("build2")
    }

    /**
     * Layer 2: Known emulator virtual pipes, character devices & drivers.
     */
    private fun checkPipesAndDrivers(): Boolean {
        val knownPipes = arrayOf(
            "/dev/socket/qemud",
            "/dev/qemu_pipe",
            "/dev/vboxguest",
            "/dev/vboxuser",
            "/sys/qemu_trace",
            "/system/lib/libc_malloc_debug_qemu.so",
            "/system/bin/qemu-props"
        )
        for (pipe in knownPipes) {
            try {
                val file = File(pipe)
                if (file.exists()) {
                    return true
                }
            } catch (_: Exception) {
            }
        }
        return false
    }

    /**
     * Layer 3: Filesystem markers left by BlueStacks, Nox, LDPlayer, Genymotion, MEmu.
     */
    private fun checkEmulatorFiles(): Boolean {
        val knownFiles = arrayOf(
            // BlueStacks
            "/data/data/com.bluestacks.home",
            "/sdcard/windows/BstSharedFolder",
            "/data/bluestacks.prop",
            // Nox
            "/data/data/com.bignox.app",
            "/system/bin/nox-prop",
            "/system/bin/noxspeedup",
            // LDPlayer
            "/system/app/ldAppStore",
            "/data/data/com.microvirt.tools",
            "/system/bin/microvirtd",
            // Genymotion
            "/dev/socket/genyd",
            "/dev/socket/baseband_genyd"
        )
        for (filePath in knownFiles) {
            try {
                val file = File(filePath)
                if (file.exists()) {
                    return true
                }
            } catch (_: Exception) {
            }
        }
        return false
    }

    /**
     * Layer 4: Reading /proc/cpuinfo for desktop hypervisor or x86 PC CPU flags.
     * Mobile phones run ARM architecture (Qualcomm Snapdragon, MediaTek, Exynos, Tensor).
     */
    private fun checkCpuInfo(): Boolean {
        try {
            val file = File("/proc/cpuinfo")
            if (file.exists()) {
                BufferedReader(FileReader(file)).use { reader ->
                    var line: String?
                    while (reader.readLine().also { line = it } != null) {
                        val lower = line?.lowercase(Locale.ROOT) ?: continue
                        if (lower.contains("hypervisor")
                            || lower.contains("intel(r)")
                            || lower.contains("amd ryzen")
                            || lower.contains("qemu virtual cpu")
                            || lower.contains("goldfish")
                        ) {
                            return true
                        }
                    }
                }
            }
        } catch (_: Exception) {
        }
        return false
    }

    /**
     * Layer 5: Hardware sensor validation.
     * Real smartphones always have an accelerometer. Emulators often have 0 sensors or mock names.
     */
    private fun checkSensors(): Boolean {
        try {
            val sensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
                ?: return false

            val sensorList = sensorManager.getSensorList(Sensor.TYPE_ALL)
            if (sensorList.isEmpty()) {
                return true
            }

            val accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
            if (accelerometer == null) {
                return true
            }

            val accelName = accelerometer.name.lowercase(Locale.ROOT)
            val accelVendor = accelerometer.vendor.lowercase(Locale.ROOT)
            if (accelName.contains("goldfish")
                || accelName.contains("mock")
                || accelName.contains("virtual")
                || accelVendor.contains("goldfish")
                || accelVendor.contains("google (virtual)")
            ) {
                return true
            }
        } catch (_: Exception) {
        }
        return false
    }
}
