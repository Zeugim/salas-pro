import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'navLink' +
                (active
                    ? 'navLink2 '
                    : 'navLink3 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
