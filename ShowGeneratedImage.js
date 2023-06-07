async function getImageGroup(imageGroupId) {
  // Get the token from sessionStorage
  let token = sessionStorage.getItem("accessToken");

  // Set up headers
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  // Send the GET request
  const response = await fetch(
    `https://api.mumuxiang.cloud/api/image_group/${imageGroupId}`,
    {
      method: "GET",
      headers: headers
    }
  );

  // Throw an error if the response is not ok
  if (!response.ok) {
    throw new Error(`Image group retrieval failed: ${response.statusText}`);
  }

  // Parse the response as JSON
  const data = await response.json();

  console.log(data);
  return data;
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContent loaded");
  //let image_group_ID = "457dc5dc-d639-4261-a61c-5a1bbf3846af";
  let imageGroupId = sessionStorage.getItem("imageGroupId");
  getImageGroup(imageGroupId)
    .then((response) => {
      console.log(response);
      let imageUrls = [];
      if (response.data && response.data.image_list) {
        imageUrls = response.data.image_list.map((item) => item.image_url);
      }
      console.log(imageUrls);

      let imgElements = document.querySelectorAll(".image-wrapper img");
      imgElements.forEach((img, index) => {
        if (index < imageUrls.length) {
          img.src = imageUrls[index];
        }
      });
    })
    .catch((error) => console.error(error));
});
