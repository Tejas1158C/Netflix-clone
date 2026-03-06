import banner from "../assets/background_banner.jpg";

export const initialNotifications = [
    {
        id: 1,
        message: "🎬 New movie released: The Midnight Sky",
        time: "2 min ago",
        unread: true,
        type: "new_release",
        image: banner
    },
    {
        id: 2,
        message: "🔥 Trending show added: Stranger Things Season 5",
        time: "1 hour ago",
        unread: true,
        type: "trending"
    },
    {
        id: 3,
        message: "⭐ Recommended for you: Breaking Bad",
        time: "Today",
        unread: false,
        type: "recommendation"
    },
    {
        id: 4,
        message: "👀 Continue watching: Inception",
        time: "Yesterday",
        unread: false,
        type: "continue_watching"
    },
    {
        id: 5,
        message: "🍿 Movie night reminder: The Dark Knight",
        time: "2 days ago",
        unread: false,
        type: "reminder"
    }
];
