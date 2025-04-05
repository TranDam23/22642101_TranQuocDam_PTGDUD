const TourMap = ({ location }) => {
    return (
      <div className="tour-map">
        <h2 className="text-primary">Bản đồ vị trí</h2>
        <iframe title="Google Maps" width="100%" height="300"
          style={{ border: 0, borderRadius: "10px"}}
          src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  export default TourMap;