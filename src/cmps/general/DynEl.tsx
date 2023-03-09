type Props = {
    tag: keyof JSX.IntrinsicElements
    children: React.ReactNode
    attributes?: React.HTMLAttributes<Element>;
}

const DynEl = (props: Props) => {
    const { tag, children, attributes } = props
    const Element = tag

    return (
        <Element {...attributes}>
            {children}
        </Element>
    )
}

export default DynEl
