import type {
    Component,
    ComponentProps,
    JSX,
    Ref,
    VNode
} from "preact";

import type { ForwardRefExoticComponent } from "preact/compat";

export type PropsWithRef<P> =
    "ref" extends keyof P
        ? P extends { ref?: infer R | undefined }
          ? string extends R
            ? PropsWithoutRef<P> & { ref?: Exclude<R, string> | undefined }
            : P
          : P
        : P;

export type PropsWithoutRef<P> = P extends any
    ? ('ref' extends keyof P ? Pick<P, Exclude<keyof P, 'ref'>> : P)
    : P;

export type ComponentPropsWithoutRef<T extends JSX.ElementType> = PropsWithoutRef<ComponentProps<T>>;

export type PrimitivePropsWithRef<E extends JSX.ElementType> = ComponentPropsWithRef<E> & {
    asChild?: boolean;
}

export interface PrimitiveForwardRefComponent<E extends JSX.ElementType> extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {
}

export type ComponentPropsWithRef<T extends JSX.ElementType> =
    T extends (new(props: infer P) => Component<any, any>)
        ? PropsWithoutRef<P> & ReAttributes<InstanceType<T>>
        : PropsWithRef<ComponentProps<T>>;

type Key = string | number | bigint;

interface Attributes {
    key?: Key | null | undefined;
}
interface ReAttributes<T>  extends Attributes {
    ref?: Ref<T> | undefined;
}

export type ElementRef<
    C extends
        | ForwardRefExoticComponent<any>
        | { new(props: any): Component<any> }
        | ((props: any, context?: any) => VNode)
        | keyof JSX.IntrinsicElements,
> =
    "ref" extends keyof ComponentPropsWithRef<C>
        ? NonNullable<ComponentPropsWithRef<C>["ref"]> extends Ref<
            infer Instance
            > 
            ? Instance
            : never
            : never;
