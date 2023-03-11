type Props = {
    tag: keyof JSX.IntrinsicElements
    children: React.ReactNode
    attributes?: React.HTMLAttributes<Element>;
    styles?: { [key: string]: string }
}

const DynEl = (props: Props) => {
    const { tag, children, attributes, styles={} } = props
    const Element = tag

    return (
        <Element {...attributes} style={styles}>
            {children}
        </Element>
    )
}

export default DynEl
