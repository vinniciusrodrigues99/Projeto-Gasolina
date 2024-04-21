//import { useState } from 'react'
import './App.css'
import './assets/logo.png'
import { useState, FormEvent } from 'react'

function App() {
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [gasolinaInput, setGasolinaInput] = useState(0) //
  const [info, setInfo] = useState<InforProps>()

  interface InforProps{
    title: string,
    alcool: string | number,
    gasolina: number | string;
  }

  function calcular(event:FormEvent){ //define o tipo de evento
    event.preventDefault() //previne o comportamento padrão do formulário
   
    const resultado = alcoolInput / gasolinaInput 
    if(resultado >= 0.7){
      setInfo({
        title: 'Compensa usar Gasolina',
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    } else {
      setInfo({
        title: 'Compensa usar Álcool',
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    }
  }

  function formatarMoeda(valor: number){
    const valorFormatado = valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) //formata o valor para moeda brasileira
    return valorFormatado;
  }
   
  return (
    <> 
      <main className='container'>
        <h1 className='title'> Qual a melhor opção?</h1>
        <img 
          src='/src/assets/logo.png'
        />
        <form className='form' onSubmit={calcular}>
          <label>Álcool(preço por litro)</label>
          <input
            type="number"
            placeholder='R$'
            className='input'
            min="1"
            required
            step="0.01"
            value ={alcoolInput}
            onChange={(e)=> setAlcoolInput(Number(e.target.value))}
          />
          <br/>
          <label>Gasolina(preço por litro)</label>
          <input
            type="number"
            placeholder='R$'
            className='input'
            min="1"
            required
            step="0.01"
            value ={gasolinaInput}
            onChange={(e)=> setGasolinaInput(Number(e.target.value))}
          />
          <br/>
          <input type='submit' value="Calcular" className='buttonCalcular' onClick={calcular}/> 
        </form>
        {info && (
          <section className='result'>
            <h2 className='result_title'> {info.title} </h2> 
            <span>
              Álcool: {info.alcool} 
            </span>
            <span>
              Gasolina: {info.gasolina} 
            </span>
          </section> 
        )}
      </main>
    </>
  )
}

export default App
