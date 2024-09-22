import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addNinja } from "../api/ninjas";
import toast from "react-hot-toast";
import "../styles/NovoNinja.css";
import { Button } from "react-bootstrap";

function NovoNinja() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function salvarNinja(data) {
    if (!data.imgURL) {
      data.imgURL = "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA1L2pvYjk2My1iLTAxNl8zLWxodHk4Mmg2LmpwZw.jpg"
    }

    console.log(data)

    addNinja(data)
      .then((res) => {
        toast.success(res.message);
        navigate("/ninjas");
      })
      .catch((err) => {
        console.log(err)
      });
  }
  return (
    <main>
      <h1>Novo ninja</h1>
      <hr />
      <div className="novoNinja">
        <form onSubmit={handleSubmit(salvarNinja)} className="formNinja">
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">Nome inválido</small>
          )}
        </div>
        <div>
          <label htmlFor="rank">Rank</label>
          <select
            name="rank"
            id="rank"
            className="form-select"
            {...register("rank", { required: true })}
          >
            <option value="" selected disabled>
              Selelcione o Rank
            </option>
            <option value="genin">Genin</option>
            <option value="chunnin">Chunnin</option>
            <option value="pJonnin">Primeiro Jonnin</option>
            <option value="sJonnin">Segundo Jonnin</option>
            <option value="anbu">ANBU</option>
            <option value="sannin">Sannin</option>
          </select>
          {errors.rank && (
              <small className="text-danger">O rank é obrigatório</small>
            )}
        </div>
        <div>
          <label htmlFor="aldeia">Aldeia</label>
          <select
            name="aldeia"
            id="aldeia"
            className="form-select"
            {...register("aldeia", { required: true })}
          >
            <option value="" selected disabled>
              Selecione a aldeia
            </option>
            <option value="folha">Aldeia da folha</option>
            <option value="areia">Aldeia da areia</option>
            <option value="rocha">Aldeia da rocha</option>
            <option value="nevoa">Aldeia da nevoa</option>
            <option value="chuva">Aldeia da chuva</option>
            <option value="outros">Outra</option>
          </select>
          {errors.aldeia && (
            <small className="text-danger">A aldeia é obrigatória</small>
          )}
        </div>
        <div>
          <label htmlFor="elemento">Elemento base</label>
          <select
            name="elemento"
            id="elemento"
            className="form-select"
            {...register("elemento", { required: true })}
          >
            <option value="" selected disabled>
              Elemento de maior domínio
            </option>
            <option value="vento">Vento</option>
            <option value="fogo">Fogo</option>
            <option value="terra">Terra</option>
            <option value="agua">Água</option>
            <option value="relampago">Relâmpago</option>
          </select>
          {errors.elemento && (
            <small className="text-danger">O elemento é obrigatório</small>
          )}
        </div>
        <div>
          <label htmlFor="imgURL">Foto (opcional)</label>
          <input type="url"
          id="imgURL"
          className="form-control"
          placeholder="URL da imagem do ninja (max 1000 caracteres)."
          {...register("imgURL", { required: false, maxLength: 1000 })} 
          />
          {errors.imgURL && (
            <small className="text-danger" >URL inválida</small>
          )}
        </div>
        <div className="botaoNinja">
          <Button variant="dark" type="submit" className="botao">Cadastrar</Button>
        </div>
        
      </form>
      </div>
    </main>
  );
}

export default NovoNinja;
