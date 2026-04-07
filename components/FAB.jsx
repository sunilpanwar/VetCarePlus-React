// Floating Action Button Component
function FAB({ onClick, icon = '+', title = 'Add' }) {
    return (
        <button 
            onClick={onClick} 
            className="fab" 
            title={title}
        >
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        </button>
    );
}

// Make it globally available
window.FAB = FAB;