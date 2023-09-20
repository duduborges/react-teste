import "./App.css"
import logoImg from "./assets/logo.png"
import { useState, FormEvent} from 'react'


  function App(){

    interface infoProps{
      title: string;
      gasolina : string | number
      alcool : string| number 
    }


    const [alcoolInput, setAlcoolInput] = useState(0)
    const [gasolinaInput, setGasolinaInput] = useState(0)
    const [info, setInfo] = useState<infoProps>()

    function Calcular(event: FormEvent){
      event.preventDefault()
      let calculo = alcoolInput/gasolinaInput

      if(calculo <= 0.7){
        setInfo({
          title: "Compensa usar Álcool",  
          gasolina: fomatarMoeda(gasolinaInput),
          alcool: fomatarMoeda(alcoolInput)
        })
      }else{
        setInfo({
          title: "Compensa usar Álcool",  
          gasolina: fomatarMoeda(gasolinaInput),
          alcool: fomatarMoeda(alcoolInput)
        })
      }
      
    }

      function fomatarMoeda(valor: number){
        let valorFormatado = valor.toLocaleString(
          'pt-BR', {
             style: 'currency', 
             currency: 'BRL' 
            })

        return valorFormatado
      }

  return(
    <div>
      <main className="container">
        <img 
        src={logoImg} 
        className="logo" 
        />
        <h1 className="title">Qual melhor opção para abastecer?</h1>
        <form className="form" onSubmit={Calcular}>
          <label >Alcool (Preço por litro): </label>
          <input 
          className="input"
          type="number" 
          placeholder="  R$"
          min="1"
          step="0.01"
          required
          value={alcoolInput}
          onChange={
            (e) => setAlcoolInput(Number(e.target.value))}
          />
        </form>
        <form className="form" onSubmit={Calcular}>
          <label >Gasolina (Preço por litro): </label>
          <input 
          className="input"
          type="number" 
          placeholder="  R$"
          min="1"
          step="0.01"
          required
          value={gasolinaInput}
          onChange={
            (e) => setGasolinaInput(Number(e.target.value))
          }

          />
          <input type="submit" className="button" value="Calcular" />
        </form>
        {info && Object.keys(info).length > 0 && (
          <section className="result">
          <h2 className="result-title">
            {info.title}
          </h2>
          <span> Álcool: {info.alcool}</span>
          <span> Gasolina: {info.gasolina}</span>

        </section>
        )}
        
      </main>
    </div>
  )

}
export default App
