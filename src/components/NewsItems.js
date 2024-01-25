import React from "react";
//import News from "./News";

const NewsItems = (props) => {
  let { title, description, imageUrl, NewsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className='card'>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span class=' badge rounded-pill bg-danger'>{source} </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://regmedia.co.uk/2022/05/12/shutterstock_social_media.jpg"
              : imageUrl
          }
          className='card-img-top'
          alt='...'
        />
        <div class='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
          <p className='card-text'>
            <small className='text-muted'>
              {" "}
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={NewsUrl}
            target='_blank'
            rel='noreferrer'
            className='btn-btn-sm btn-dark'
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewsItems;
