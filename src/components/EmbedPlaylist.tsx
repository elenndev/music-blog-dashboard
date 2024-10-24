const Iframe: React.FC<{playlist: string}> = ({playlist}) => {
    return(
        <iframe
        style={{ borderRadius: '12px' }}
        src={playlist}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>
    )
}

export default Iframe