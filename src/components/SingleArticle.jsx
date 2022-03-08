import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
import { CommentsWrapper } from "./CommentsWrapper";
import { CommentList } from "./CommentsList";

export const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);
  const date = new Date(article.created_at);

  return isLoading ? (
    <h2>Just getting that for you ...</h2>
  ) : (
    <article className="singleArticle">
      <h1>{article.title}</h1>
      <dt>by {article.author}</dt>
      <dt> on {date.toLocaleString()}</dt>
      <dt>
        Topic: {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
      </dt>
      <dt> -- Votes: {article.votes}</dt>
      <p className="singleArticle__body"> {article.body}</p>
      <p>Comment: {article.comment_count}</p>
      <CommentsWrapper>
        <CommentList />
      </CommentsWrapper>
    </article>
  );
};


