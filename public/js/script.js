document.addEventListener('DOMContentLoaded', function() {
    const campos = "media_type,media_url,permalink";
    const limite = 40;
    const token = process.env.API_KEY;

    console.log(API_KEY)



    const baseURL = `https://graph.instagram.com/me/media?fields=${campos}&access_token=${token}&limit=${limite}`;
    
    fetch(baseURL)
        .then((response) => response.json())
        .then((data) => { 
            const container = document.querySelector(".container");

            data.data.forEach((img) => {
                const mediaType = img.media_type;
                const mediaUrl = img.media_url;
                const permalink = img.permalink;
                if (mediaType === "VIDEO") {
                    // const video = document.createElement("video");
                    // video.src = mediaUrl;
                    // video.classList.add("container-video");
                    // container.appendChild(video);
                } else {
                    const anchor = document.createElement("a");
                    anchor.href = permalink;
                    anchor.target = "_blank"; // Open in a new tab
                    const image = document.createElement("img");
                    image.src = mediaUrl;
                    image.classList.add("container-img");
                    image.onload = () => {
                        image.style.opacity = 1; // Defina a opacidade para 1 após o carregamento
                    };
                    anchor.appendChild(image);
                    container.appendChild(anchor);
                }
            });

            // Inicialize o carrossel após adicionar as imagens
            $('.responsive').slick({
                dots: true,
                arrows: true,
                infinite: true,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true,
                            arrows: true,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: true,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: true,
                        }
                    }
                ]
            });
        })
        .catch((error) => {
            console.error("Error fetching Instagram data:", error);
        });

    // Adicione a animação ao rolar a página
    
});