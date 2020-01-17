import React, { useState, useEffect } from 'react';
import "./services/api"
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import api from './services/api';
import DevItem from './componets/DevItem';
import DevForm from './componets/DevForm';

//3 conceitos principais do react
// Componente: é um bloco isolado de  html/css/js que não interfere no restante da aplicação
// Propriedade: informações que um componente pai passa para um componente filho
// Estado: informações mantidas pelo componente (Lembrar imutabilidade)
// useState: função para utilizar o state
// useState retorna um vetor com duas variaveis dentro dela
// const [counter,setCounter] = usestate(0)
// const setCounter(counter+1) 
//no react só deve ter um componente por arquivo
function App() {
    const [devs, setDevs] = useState([]);



    useEffect(() => {
        async function loadDevs() {
            const response = await api.get("/devs");
            setDevs(response.data);
            console.log(response.data)
        }
        loadDevs();
    }, []);

    async function handleAddDev(data){
        const response = await api.post("/devs", data);
        setDevs([...devs, response.data]);
        
    }

    return (
        <div id="app" >
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map((dev, index) => (
                        <DevItem dev={dev} key={index} />
                    ))}
                </ul>
            </main>
        </div>);
}

export default App;