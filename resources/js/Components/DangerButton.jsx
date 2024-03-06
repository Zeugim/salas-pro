export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `danger-button ${disabled && 'primary-button2'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
