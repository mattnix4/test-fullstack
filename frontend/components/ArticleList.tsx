import React from 'react';

type Article = { id: string; title: string; date: string; summary: string };

type ArticleListProps = {
  articles: Article[] | null;
  loading: boolean;
  error: string | null;
};

export default function ArticleList({ articles, loading, error }: ArticleListProps) {
  if (loading) return <p style={{ color: "#666" }}>Chargement…</p>;
  if (error) return (
    <p style={{ color: "#d32f2f", padding: "12px", background: "#ffebee", borderRadius: "8px" }}>
      {error}
    </p>
  );
  if (!articles || articles.length === 0) {
    return <p style={{ color: "#666", textAlign: "center", padding: "40px" }}>Aucun resultat trouvé</p>;
  }

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      {articles.map(a => (
        <article 
          key={a.id} 
          style={{ 
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            background: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
        >
          <h3 style={{ marginBottom: "8px", color: "#1a1a1a" }}>{a.title}</h3>
          <time style={{ fontSize: "14px", color: "#666" }}>
            {new Date(a.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
          <p style={{ marginTop: "12px", color: "#444", lineHeight: "1.6" }}>{a.summary}</p>
        </article>
      ))}
    </div>
  );
}