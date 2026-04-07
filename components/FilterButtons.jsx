// Filter Buttons Component
function FilterButtons({ activeFilter, onFilterChange, filters }) {
    return (
        <div className="filter-buttons">
            {filters.map(filter => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`btn btn-outline filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}

// Make it globally available
window.FilterButtons = FilterButtons;