import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`resnav0 ${active
                ? 'resnav1'
                : 'resnav2'
                } resnav3 ${className}`}
        >
            {children}
        </Link>
    );
}
