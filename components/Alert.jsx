// Alert Component
function Alert({ message, type = 'info', onClose }) {
    if (!message) return null;

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    return (
        <div className={`alert alert-${type}`} style={{ display: 'block' }}>
            <span>{icons[type]} {message}</span>
            {onClose && (
                <button 
                    onClick={onClose} 
                    style={{ 
                        float: 'right', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                    }}
                >
                    &times;
                </button>
            )}
        </div>
    );
}

// Make it globally available
window.Alert = Alert;