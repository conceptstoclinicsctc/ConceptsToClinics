import React from 'react';
import { useUploadManager } from '../context/UploadContext';
import {
  RiCheckLine,
  RiErrorWarningLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiLoader4Line,
  RiPauseCircleLine,
} from 'react-icons/ri';

export const FloatingUploadManager: React.FC = () => {
  const { tasks, dismissTask, clearCompleted, isMinimized, setIsMinimized } = useUploadManager();

  if (tasks.length === 0) return null;

  const activeCount = tasks.filter((t) => t.status === 'uploading').length;
  const pausedCount = tasks.filter((t) => t.status === 'paused').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const anyActive = activeCount > 0 || pausedCount > 0;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: isMinimized ? 280 : 360,
        maxWidth: 'calc(100vw - 32px)',
        background: '#0F172A',
        border: '1px solid var(--border-subtle, #334155)',
        borderRadius: 16,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Widget Header */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--bg-card-hover, #1E293B)',
          borderBottom: isMinimized ? 'none' : '1px solid var(--border-subtle, #334155)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => setIsMinimized((prev) => !prev)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: activeCount > 0
                ? 'rgba(99, 102, 241, 0.15)'
                : pausedCount > 0
                ? 'rgba(245, 158, 11, 0.15)'
                : 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeCount > 0
                ? 'var(--primary, #6366F1)'
                : pausedCount > 0
                ? '#F59E0B'
                : '#10B981',
            }}
          >
            {activeCount > 0 ? (
              <RiLoader4Line className="spin" style={{ fontSize: 18 }} />
            ) : pausedCount > 0 ? (
              <RiPauseCircleLine style={{ fontSize: 18 }} />
            ) : (
              <RiCheckLine style={{ fontSize: 18 }} />
            )}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>
              {activeCount > 0
                ? `Uploading ${activeCount} video${activeCount > 1 ? 's' : ''}...`
                : pausedCount > 0
                ? `${pausedCount} upload${pausedCount > 1 ? 's' : ''} paused`
                : 'Uploads Completed'}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>
              {activeCount > 0
                ? `${activeCount} in progress`
                : pausedCount > 0
                ? 'Return to this tab to resume'
                : `${completedCount} completed task${completedCount > 1 ? 's' : ''}`}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized((prev) => !prev);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: 4,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
            }}
            title={isMinimized ? 'Expand Widget' : 'Minimize Widget'}
          >
            {isMinimized ? <RiArrowUpSLine style={{ fontSize: 20 }} /> : <RiArrowDownSLine style={{ fontSize: 20 }} />}
          </button>
        </div>
      </div>

      {/* Widget Task List */}
      {!isMinimized && (
        <div style={{ maxHeight: 320, overflowY: 'auto', padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle, #334155)',
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ flex: 1, marginRight: 8, overflow: 'hidden' }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#F8FAFC',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#94A3B8' }}>
                      {formatFileSize(task.file.size)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {task.status === 'uploading' && (
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary, #6366F1)' }}>
                        {task.progress}%
                      </span>
                    )}
                    {task.status === 'paused' && (
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <RiPauseCircleLine style={{ fontSize: 14 }} />
                        {task.progress}%
                      </span>
                    )}
                    {task.status === 'completed' && (
                      <RiCheckLine style={{ color: '#10B981', fontSize: 18 }} />
                    )}
                    {task.status === 'error' && (
                      <RiErrorWarningLine style={{ color: '#EF4444', fontSize: 18 }} />
                    )}

                    <button
                      type="button"
                      onClick={() => dismissTask(task.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#64748B',
                        cursor: 'pointer',
                        padding: 2,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Dismiss"
                    >
                      <RiCloseLine style={{ fontSize: 16 }} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {(task.status === 'uploading' || task.status === 'paused') && (
                  <div
                    style={{
                      width: '100%',
                      height: 6,
                      background: '#1E293B',
                      borderRadius: 3,
                      overflow: 'hidden',
                      marginTop: 6,
                    }}
                  >
                    <div
                      style={{
                        width: `${task.progress}%`,
                        height: '100%',
                        background: task.status === 'paused'
                          ? 'linear-gradient(90deg, #F59E0B 0%, #FCD34D 100%)'
                          : 'linear-gradient(90deg, #6366F1 0%, #818CF8 100%)',
                        borderRadius: 3,
                        transition: 'width 0.2s ease',
                      }}
                    />
                  </div>
                )}
                {task.status === 'paused' && (
                  <div style={{ fontSize: 10, color: '#F59E0B', marginTop: 4, fontWeight: 500 }}>
                    ⏸ Paused — switch back to this tab to resume
                  </div>
                )}

                {task.status === 'error' && (
                  <div style={{ fontSize: 11, color: '#F87171', marginTop: 4 }}>
                    {task.errorMessage || 'Upload failed'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {completedCount > 0 && (
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <button
                type="button"
                onClick={clearCompleted}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear Finished
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
