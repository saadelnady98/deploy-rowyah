
const EmbeddedMap = ({ lat, lng }) => {
    const mapUrl = `www.google.com{lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus`;

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
            ></iframe>
        </div>
    );
};

// Usage:
// <EmbeddedMap lat={34.052235} lng={-118.243683} />
