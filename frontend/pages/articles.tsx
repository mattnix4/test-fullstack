// pages/articles.tsx
import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import ChatWidget from "../components/ChatWidget";
import ArticleList from "../components/ArticleList";
import SearchBar from "../components/SearchBar";

type Article = { id: string; title: string; date: string; summary: string };

type ChatResponse = {
  answer: string;
  sources: string[];
  suggested_questions: string[];
};

export default function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [chatResp, setChatResp] = useState<ChatResponse | null>(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ q: string; a: string }>>([]);


  useEffect(() => {
    const timer = setTimeout(() => fetchArticles(), 300);
    return () => clearTimeout(timer);
  }, [query, sort]);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      params.set("sort", sort);
      const res = await fetch(`/api/articles?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setArticles(data.results);
    } catch (err: any) {
      setError(err.message || "Erreur reseau");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [query, sort]);


  const handleChatSend = async (message: string) => {
    setChatLoading(true);
    setChatError(null);
    setChatResp(null);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CHAT_API_URL as string, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message })
      });

      if (!res.ok) throw new Error(`Erreur serveur ${res.status}`);
      
      const data: ChatResponse = await res.json();
      setChatResp(data);
      setChatHistory(prev => [...prev, { q: message, a: data.answer }]);
    } catch (e: any) {
      setChatError(e.message || "Impossible de contacter le service chat");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Articles</title>
        <meta name="description" content="Plateforme d'articles avec assistant IA" />
      </Head>

      <div style={{ 
        padding: "20px", 
        maxWidth: "1200px", 
        margin: "0 auto",
        fontFamily: "sans-serif"
      }}>
        <header style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>Articles</h1>
        </header>


        <SearchBar
          query={query}
          onQueryChange={setQuery}     
          sort={sort}
          onSortToggle={() => setSort(prev => prev === "desc" ? "asc" : "desc")}
        />

        <ArticleList
          articles={articles}
          loading={loading}
          error={error}
        />

      </div>

      {/* Chat */}
      <ChatWidget
        onSendMessage={handleChatSend}
        chatHistory={chatHistory}
        chatResp={chatResp}
        chatError={chatError}
        chatLoading={chatLoading}
      />
    </>
  );
}