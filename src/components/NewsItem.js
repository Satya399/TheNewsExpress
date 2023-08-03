import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div class="card" style={{ width: "18rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span class=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            class="card-img-top"
            src={
              !imageUrl
                ? "https://images.hindustantimes.com/tech/img/2023/08/01/1600x900/azamat-e-cH7vFoUxF9w-unsplash_1689053164767_1690868901115.jpg"
                : imageUrl
            }
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <p class="card-text">{description}...</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              class="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
