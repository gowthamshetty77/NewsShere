import React from "react";

const NewsItem = (props) => {
  let {
    title,
    description,
    imageUrl,
    newsUrl,
    id,
    author,
    publishedAt,
    source,
  } = props;

  const truncate = (str, maxLength) => {
    if (!str) return "";
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + ".....";
    }
    return str;
  };

  const truncatedTitle = truncate(title, 60);
  const truncatedDescription = truncate(description, 88);

  return (
    <div className="my-3">
      <div
        className="card"
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            right: 0,
          }}
        >
          <span
            className="badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: 1 }}
          >
            {source}
          </span>
        </div>

        <img
          src={imageUrl}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
          }}
          className="card-img-top"
          alt={id}
        />
        <div
          className="card-body"
          style={
            {
              // overflow: "hidden",
            }
          }
        >
          <h5 className="card-title">{truncatedTitle}</h5>
          <p className="card-text">{truncatedDescription}</p>
          <p className="card-text">
            <small className="text-mutes">
              By {author} on {publishedAt}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            // rel="noopener"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
