import React from "react";
import { StyledRegisterVideo } from "./style";
import { createClient } from "@supabase/supabase-js";


function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
    values,
    handleChange:
        (evento) => {
//            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm: () => {
            setValues({});
        }
};
}
const PROJECT_URL = "https://taodejcylfdlsgnphgid.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhb2RlamN5bGZkbHNnbnBoZ2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODk4OTIsImV4cCI6MTk4Mzg2NTg5Mn0.VCryNE2jt1XoYOVO-5C9nVDXSCq9Wjitk5R1R2tw-3k";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "Maneva - Respostas (Ao Vivo)", url: "https://www.youtube.com/watch?v=-TfNBqvYjSk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
//    console.log();

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel 
            ? (
                <form onSubmit={(evento) => {
                    evento.preventDefault();

                    // Contrato entre o nosso Front e o BackEnd
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "Músicas Favoritas - Maneva",
                    })

                    .then((oqueveio) => {
                        console.log(oqueveio);
                     })
                     .catch((err) => {
                        console.log(err);
                     })

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                <div>
                <button className="close-modal" onClick={() => setFormVisivel(false)}>
                    X
                </button>
                <input 
                    placeholder="Titulo do vídeo" 
                    name="titulo"
                    value={formCadastro.values.titulo} 
                    onChange={formCadastro.handleChange}
                     />
                <input placeholder="URL" 
                    name="url"
                    value={formCadastro.values.url}
                    onChange={formCadastro.handleChange} />
                <button type="submit">
                    Cadastrar
                    </button>
                </div>
            </form>
    )
            : false}

        </StyledRegisterVideo>
    )
}