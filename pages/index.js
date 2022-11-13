import React from "react"
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { createClient } from "@supabase/supabase-js";
import { videoService } from "../src/services/videoService";

const PROJECT_URL = "https://taodejcylfdlsgnphgid.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhb2RlamN5bGZkbHNnbnBoZ2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODk4OTIsImV4cCI6MTk4Mzg2NTg5Mn0.VCryNE2jt1XoYOVO-5C9nVDXSCq9Wjitk5R1R2tw-3k";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    // const playlists = {
    //     "jogos": [],
    // };
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
    service
    .getAllVideos()
    .then((dados) => {
 //       console.log(dados.data);
        const novasPlaylists = {...playlists};
        dados.data.forEach((video) => {
            if(!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
            }
        })
        setPlaylists(novasPlaylists);
    });
}, [])

//console.log("Playlists pronto", playlists);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage;

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.backgroundLevel1};

img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
} 
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
}
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    height: 230px;
    `;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
                <section className="user-info">
                    <img src={`https://github.com/${config.github}.png`} />
                    <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}
function Timeline({ searchValue, ...propriedades }) {
    //console.log("Dentro do componente", propriedades.playlists);
    const playlistsName = Object.keys(propriedades.playlists);
    return (
        <StyledTimeline>
            {playlistsName.map(function (playlistsName) {
                const videos = propriedades.playlists[playlistsName];
//                console.log(playlistsName);
//                console.log(videos);
                return (
                    <section key={playlistsName}>
                        <h2>{playlistsName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                              return titleNormalized.includes(searchValueNormalized)                        
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

