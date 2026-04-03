const LoadingSpinner = ({ fullScreen = true }) => {
    // The actual spinner visual
    const spinnerContent = (
        <div className='relative flex items-center justify-center'>
            {/* Subtle background track */}
            <div className='w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/5 rounded-full' />
            
            {/* Spinning brand color with a glow */}
            <div className='absolute left-0 top-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-primary border-t-transparent border-l-transparent animate-spin rounded-full drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]' />
            
            <div className='sr-only'>Loading</div>
        </div>
    );

    // If it needs to cover the whole screen (e.g., in App.jsx during initial auth check)
    if (fullScreen) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-slate-900'>
                {spinnerContent}
            </div>
        );
    }

    // If it's just being used inline (e.g., inside CategoryPage or a button)
    return (
        <div className="flex items-center justify-center w-full h-full p-4">
            {spinnerContent}
        </div>
    );
};

export default LoadingSpinner;