import React, { FormEvent, useState } from "react";


import previewImageNLW from '../assets/previewImageNLW.png'
import Logo from '../assets/logo.svg'

import AvatarDiv from '../assets/avatarDiv.png'
import Image from "next/image";
import icon from '../assets/icon.svg'
import { api } from "../lib/axios";

type HomeProps = {
  poolCount: number;
  guessesCount: number;
  userCount: number;


}


export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })


      const { code } = response.data

      await navigator.clipboard.writeText(code)
      setPoolTitle('')

      alert(`Bolão criado com sucesso! Código bb copiado para área de transferencia!`)

    } catch (error) {
      console.log(error);

      alert("Erro ao criar o bolão")

    }



  }



  return (
    <div className="lg:max-w-[1124px]  h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={Logo} alt="NLW Copa" />

        <h1 className="mt-14 text-white font-bold text-5xl leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={AvatarDiv} alt='' />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>


        <form className="mt-10 flex gap-2" onSubmit={createPool}>
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
            placeholder="Qual nome do seu bolão?" />
          <button
            className="bg-yellow-500  px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700">
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">

          <div className="flex gap-6">
            <Image src={icon} alt='' />
            <div className="flex flex-col">
              <span className="font-bold text-2xl  " >
                +{props.poolCount}
              </span>
              <span>
                Bolões criados
              </span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex gap-6">
            <Image src={icon} alt='' />
            <div className="flex flex-col">
              <span className="font-bold text-2xl ">
                +{props.guessesCount}
              </span>
              <span>
                Palpites enviados
              </span>
            </div>
          </div>
        </div>


      </main>

      <Image src={previewImageNLW} alt="Celulares mostrando app mobile NLW" className="hidden lg:block" />
    </div>
  )
}

export const getServerSideProps = async () => {


  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse
  ] =
    await Promise.all([
      api.get("/pools/count"),
      api.get("/guesses/count"),
      api.get('/users/count')
    ])









  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,

    },
  };
};
