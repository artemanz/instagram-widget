function instagramWidget() {
  const apiUrl = "https://weblab-instagram-widget.netlify.app/api/widget";

  const FollowSvg = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.99999 5.19298C7.33983 5.19298 5.19296 7.33986 5.19296 10C5.19296 12.6602 7.33983 14.807 9.99999 14.807C12.6601 14.807 14.807 12.6602 14.807 10C14.807 7.33986 12.6601 5.19298 9.99999 5.19298ZM9.99999 13.1242C8.27968 13.1242 6.87577 11.7203 6.87577 10C6.87577 8.2797 8.27968 6.87579 9.99999 6.87579C11.7203 6.87579 13.1242 8.2797 13.1242 10C13.1242 11.7203 11.7203 13.1242 9.99999 13.1242ZM15.0039 3.87579C14.3828 3.87579 13.8812 4.37736 13.8812 4.99845C13.8812 5.61954 14.3828 6.12111 15.0039 6.12111C15.625 6.12111 16.1266 5.62189 16.1266 4.99845C16.1267 4.85097 16.0978 4.7049 16.0415 4.56861C15.9851 4.43232 15.9024 4.30849 15.7981 4.2042C15.6939 4.09992 15.57 4.01723 15.4337 3.96087C15.2974 3.90452 15.1514 3.87561 15.0039 3.87579ZM19.3703 10C19.3703 8.70626 19.382 7.42423 19.3094 6.13283C19.2367 4.63283 18.8945 3.30158 17.7976 2.2047C16.6984 1.10548 15.3695 0.765639 13.8695 0.692982C12.5758 0.620326 11.2937 0.632045 10.0023 0.632045C8.70858 0.632045 7.42655 0.620326 6.13515 0.692982C4.63515 0.765639 3.3039 1.10783 2.20702 2.2047C1.1078 3.30392 0.767958 4.63283 0.695302 6.13283C0.622645 7.42658 0.634364 8.70861 0.634364 10C0.634364 11.2914 0.622645 12.5758 0.695302 13.8672C0.767958 15.3672 1.11015 16.6985 2.20702 17.7953C3.30624 18.8945 4.63515 19.2344 6.13515 19.307C7.4289 19.3797 8.71093 19.368 10.0023 19.368C11.2961 19.368 12.5781 19.3797 13.8695 19.307C15.3695 19.2344 16.7008 18.8922 17.7976 17.7953C18.8969 16.6961 19.2367 15.3672 19.3094 13.8672C19.3844 12.5758 19.3703 11.2938 19.3703 10ZM17.3078 15.5266C17.1367 15.9531 16.9305 16.2719 16.6 16.6C16.2695 16.9305 15.9531 17.1367 15.5266 17.3078C14.2937 17.7977 11.3664 17.6875 9.99999 17.6875C8.63358 17.6875 5.7039 17.7977 4.47108 17.3102C4.04452 17.1391 3.72577 16.9328 3.39765 16.6024C3.06718 16.2719 2.86093 15.9555 2.68983 15.5289C2.20233 14.2938 2.31249 11.3664 2.31249 10C2.31249 8.63361 2.20233 5.70392 2.68983 4.47111C2.86093 4.04454 3.06718 3.72579 3.39765 3.39767C3.72811 3.06954 4.04452 2.86095 4.47108 2.68986C5.7039 2.20236 8.63358 2.31251 9.99999 2.31251C11.3664 2.31251 14.2961 2.20236 15.5289 2.68986C15.9555 2.86095 16.2742 3.0672 16.6023 3.39767C16.9328 3.72814 17.1391 4.04454 17.3101 4.47111C17.7976 5.70392 17.6875 8.63361 17.6875 10C17.6875 11.3664 17.7976 14.2938 17.3078 15.5266Z" fill="white"/></svg>
  `;

  const videoSvg = `
  <svg class="ico" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 3C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.31607 2.20435 0 3 0H12C12.7956 0 13.5587 0.31607 14.1213 0.87868C14.6839 1.44129 15 2.20435 15 3V15C15 15.7956 14.6839 16.5587 14.1213 17.1213C13.5587 17.6839 12.7956 18 12 18H3C2.20435 18 1.44129 17.6839 0.87868 17.1213C0.31607 16.5587 0 15.7956 0 15V3ZM18.8295 4.659C18.5804 4.78349 18.3708 4.97487 18.2243 5.21171C18.0778 5.44855 18.0001 5.72151 18 6V12C18.0001 12.2785 18.0778 12.5514 18.2243 12.7883C18.3708 13.0251 18.5804 13.2165 18.8295 13.341L21.8295 14.841C22.0581 14.9552 22.3122 15.0092 22.5675 14.9977C22.8228 14.9862 23.071 14.9096 23.2884 14.7753C23.5058 14.641 23.6853 14.4533 23.8099 14.2301C23.9344 14.0069 23.9999 13.7556 24 13.5V4.5C23.9999 4.24441 23.9344 3.9931 23.8099 3.76991C23.6853 3.54672 23.5058 3.35905 23.2884 3.22471C23.071 3.09037 22.8228 3.01382 22.5675 3.00232C22.3122 2.99082 22.0581 3.04475 21.8295 3.159L18.8295 4.659Z" fill="#FAFAFA"/>
  </svg>
  `;

  const collectionSvg = `
  <svg class="ico" fill="#FAFAFA" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" class="absolute rotate-180 top-2 right-2 text-neutral-50" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 6a3 3 0 00-3-3H6a3 3 0 00-3 3v7.5a3 3 0 003 3v-6A4.5 4.5 0 0110.5 6h6z"></path><path d="M18 7.5a3 3 0 013 3V18a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3H18z"></path></svg>
  `;

  const styles = document.createElement("style");
  styles.insertAdjacentHTML(
    "afterbegin",
    `
  #instagram-widget-weblab {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
  }
  #instagram-widget-weblab * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #instagram-widget-weblab ul {
    list-style: none;
  }
  #instagram-widget-weblab ul li::before {
    display: none;
  }
  #instagram-widget-weblab small {
    font-size: 14px;
  }
  #instagram-widget-weblab img {
    display: block;
    max-width: 100%;
    -o-object-fit: cover;
       object-fit: cover;
  }
  #instagram-widget-weblab video {
    display: block;
    max-width: 100%;
  }
  #instagram-widget-weblab .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
  }
  @media (max-width: 767.98px) {
    #instagram-widget-weblab .header {
      flex-direction: column;
    }
  }
  #instagram-widget-weblab .header-hero {
    display: flex;
    align-items: center;
  }
  #instagram-widget-weblab .header-hero .image-container {
    padding: 3px;
    background: linear-gradient(180deg, #feb76b 0%, #fe7bc2 47.92%, #bf95f9 100%);
    border-radius: 100%;
    overflow: hidden;
    flex-shrink: 0;
  }
  #instagram-widget-weblab .header-hero img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
  }
  #instagram-widget-weblab .header-hero .info {
    margin-left: 16px;
  }
  #instagram-widget-weblab .header-hero .name {
    font-weight: bold;
    line-height: 1.2;
    max-width: 250px;
  }
  #instagram-widget-weblab .header-hero .username {
    color: #7b818b;
  }
  #instagram-widget-weblab .header-info {
    display: flex;
    gap: 24px;
    margin-left: auto;
    margin-right: 32px;
  }
  @media (max-width: 767.98px) {
    #instagram-widget-weblab .header-info {
      margin-left: 0;
      margin-right: 0;
    }
  }
  #instagram-widget-weblab .header-info-item {
    text-align: center;
  }
  #instagram-widget-weblab .header-info-item p {
    font-weight: bold;
    line-height: 1;
  }
  #instagram-widget-weblab .header-info-item small {
    color: #7b818b;
  }
  #instagram-widget-weblab .header-follow {
    -webkit-text-decoration: none;
    text-decoration: none;
    display: flex;
    gap: 8px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    color: white;
    border-radius: 6px;
    background-color: rgb(14, 165, 233);
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  #instagram-widget-weblab .header-follow:hover, #instagram-widget-weblab .header-follow:active {
    background-color: rgb(2, 132, 199);
  }
  #instagram-widget-weblab .header-follow:active {
    transform: scale(0.95);
  }
  #instagram-widget-weblab .images-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 767.98px) {
    #instagram-widget-weblab .images-grid {
      grid-template-columns: minmax(0, 300px);
      justify-content: center;
    }
  }
  #instagram-widget-weblab .images-grid-item {
    background-color: #000;
    aspect-ratio: 1/1;
    overflow: hidden;
    position: relative;
    display: grid;
    align-content: center;
    justify-content: center;
  }
  #instagram-widget-weblab .images-grid-item .ico {
    position: absolute;
    top: 16px;
    right: 16px;
  }
  #instagram-widget-weblab .images-grid-item:hover .images-grid-item-caption {
    transform: scaleY(1);
  }

  #instagram-widget-weblab .images-grid-item-caption {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 16px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  #instagram-widget-weblab .images-grid-item-caption pre {
    white-space: pre-line;
    font-family: inherit;
    height: 100%;
    overflow: hidden;
  }
  #instagram-widget-weblab .images-grid-item-caption::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to bottom, transparent 50%, black 100%);
  }
  #instagram-widget-weblab .footer {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  #instagram-widget-weblab .footer-follow {
    -webkit-text-decoration: none;
    text-decoration: none;
    display: flex;
    gap: 8px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    color: white;
    border-radius: 6px;
    background-color: rgb(14, 165, 233);
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  #instagram-widget-weblab .footer-follow:hover, #instagram-widget-weblab .footer-follow:active {
    background-color: rgb(2, 132, 199);
  }
  #instagram-widget-weblab .footer-follow:active {
    transform: scale(0.95);
  }

  `
  );

  const widgetContainer = document.getElementById("instagram-widget-weblab");

  function loadInstagramPhotos() {
    fetch(apiUrl, {
      method: "POST",
      headers: { Accept: "*/*", "Content-Type": "application/json" },
      body: JSON.stringify({
        username: CONFIG.login,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const userData = JSON.parse(data.fb_data);
        const mediaData = userData.business_discovery;

        if (mediaData) {
          createInstagramWidget(userData);
        } else {
          console.error("Не удалось получить данные Instagram");
        }
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса к Instagram API", error);
      });
  }

  function createInstagramWidget(userData) {
    widgetContainer.innerHTML = "";
    widgetContainer.appendChild(styles);

    userData = userData.business_discovery;

    const mediaData = userData.media.data;

    if (CONFIG.header) {
      const $header = document.createElement("header");
      $header.className = "header";

      const $headerHero = document.createElement("div");
      $headerHero.className = "header-hero";

      if (CONFIG.profile_picture) {
        const $profielPicture = `
        <div class="image-container">
          <img src="${userData.profile_picture_url}" alt="">
        </div>
        `;

        $headerHero.insertAdjacentHTML("beforeend", $profielPicture);
      }

      const $headerHeroInfo = document.createElement("div");
      $headerHeroInfo.className = "info";

      if (CONFIG.full_name) {
        const $fullName = `
          <p class="name">${userData.name}</p>
        `;

        $headerHeroInfo.insertAdjacentHTML("beforeend", $fullName);
      }

      if (CONFIG.username) {
        const $username = `
        <small class="username">@${userData.username}</small>
      `;

        $headerHeroInfo.insertAdjacentHTML("beforeend", $username);
      }

      $headerHero.insertAdjacentElement("beforeend", $headerHeroInfo);

      $header.insertAdjacentElement("beforeend", $headerHero);

      const $headerInfo = document.createElement("ul");
      $headerInfo.className = "header-info";

      if (CONFIG.postCount) {
        const $postCount = `
      <li class="header-info-item">
        <p>${userData.media_count}</p>
        <small>Posts</small>
      </li>
      `;

        $headerInfo.insertAdjacentHTML("beforeend", $postCount);
      }
      if (CONFIG.followersCount) {
        const $followersCount = `
      <li class="header-info-item">
        <p>${userData.followers_count}</p>
        <small>Followers</small>
      </li>
      `;

        $headerInfo.insertAdjacentHTML("beforeend", $followersCount);
      }
      if (CONFIG.followingCount) {
        const $followingCount = `
      <li class="header-info-item">
        <p>${userData.follows_count}</p>
        <small>Following</small>
      </li>
      `;

        $headerInfo.insertAdjacentHTML("beforeend", $followingCount);
      }

      $header.insertAdjacentElement("beforeend", $headerInfo);

      if (CONFIG.followButton) {
        const $headerFollow = `
      <a class="header-follow" href="${
        "https://www.instagram.com/" + userData.username
      }">
        ${FollowSvg}
        Follow
      </a>
      `;

        $header.insertAdjacentHTML("beforeend", $headerFollow);
      }

      widgetContainer.insertAdjacentElement("beforeend", $header);
    }

    widgetContainer.insertAdjacentHTML(
      "beforeend",
      `
      <ul class="images-grid">
      ${mediaData.slice(0, 9).reduce((acc, data) => {
        const mediaElement =
          data.media_type === "VIDEO"
            ? document.createElement("video")
            : document.createElement("img");
        if (
          data.media_type === "IMAGE" ||
          data.media_type === "CAROUSEL_ALBUM"
        ) {
          mediaElement.src = data.media_url;
          mediaElement.className = "gallery-image";
        } else if (data.media_type === "VIDEO") {
          mediaElement.src = data.media_url;
          mediaElement.className = "gallery-image";
          mediaElement.loop = true;
        }

        return (
          acc +
          `
          <li class="images-grid-item">
            ${
              data.media_type === "VIDEO"
                ? videoSvg
                : data.media_type === "CAROUSEL_ALBUM"
                ? collectionSvg
                : ""
            }
            <a href="${data.permalink}">
              ${mediaElement.outerHTML}
            </a>
            ${
              data.caption
                ? `<div class="images-grid-item-caption">
                  <pre>${data.caption}</pre>
                </div>`
                : ""
            }
          </li>
        `
        );
      }, "")}
      </ul>

      <footer class="footer">
      <a class="footer-follow" href="${
        "https://www.instagram.com/" + userData.username
      }">
          See more
        </a>
      </footer>
  `
    );
  }

  loadInstagramPhotos();
}

window.addEventListener("DOMContentLoaded", instagramWidget);
