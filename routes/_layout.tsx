import { PageProps } from '$fresh/server.ts';

export default function Layout({ Component}: PageProps) {
    return (
        <div className="layout">
            <Component />
        </div>
    );
}
