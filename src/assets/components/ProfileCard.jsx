function ProfileCard() {
  const user = {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=5"
  };

  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "300px",
        textAlign: "center"
      }}
    >
      <img
        src={user.image}
        alt={user.name}
        style={{ borderRadius: "50%", marginBottom: "10px" }}
      />

      <h2>{user.name}</h2>
      <p style={{ color: "#666" }}>{user.role}</p>

      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        View Profile
      </button>
    </div>
  );
}

export default ProfileCard;
