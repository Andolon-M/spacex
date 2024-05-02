export const getAllRockets = async ()=>{
    let res = await fetch("https://api.spacexdata.com/v4/rockets")
    let data = await res.json();
    let listMasa = [], 
        listPayloadWeights = [], 
        heightRocket = [], 
        listDiameter = [], 
        listaDiameterComposite = [],
        listaHeightComposite = [];

    data.forEach((val, id) => {
        listMasa.push(val.mass.kg);
        listPayloadWeights.push(...val.payload_weights)
        heightRocket.push(val.height)
        listDiameter.push(val.diameter)
        listaDiameterComposite.push(val.second_stage.payloads.composite_fairing.diameter)
        listaHeightComposite.push(val.second_stage.payloads.composite_fairing.height)
    });
    
    listMasa.sort((a,b) => b - a)
    listPayloadWeights.sort((a,b) => b.kg - a.kg)
    heightRocket.sort((a,b) => b.meters - a.meters)
    listDiameter.sort((a,b) => b.meters - a.meters)
    listaDiameterComposite.sort((a,b) => b.meters - a.meters)
    listaHeightComposite.sort((a,b) => b.meters - a.meters)
    data.push({
        kg_max: listMasa.shift(), 
        payload_weights: listPayloadWeights.shift().kg,
        height: heightRocket.shift().meters,
        diameter: listDiameter.shift().meters,
        composite_diameter : listaDiameterComposite.shift().meters,
        composite_height: listaHeightComposite.shift().meters
    });
    
    return data;
}


export const getMassAllRockets = async()=>{
    let config = {
        headers:{
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "options":{
                "select": {
                    "name":1,
                    "mass":1
                },
                "sort":{
                    "mass.kg": "desc"
                }
            }
        })
    }
    let res = await fetch("https://api.spacexdata.com/v4/rockets/query", config);
    let data= await res.json();
    console.log("Se retornan las masas de los cohetes de mayor a menor masa: ",data);
    return data;
}

export const getMaxMass = async()=>{
    let config = {
        headers:{
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "options":{
                "select": {
                    "name":1,
                    "mass":1
                },
                "sort":{
                    "mass.kg": "desc"
                }
            }
        })
    }
    let res = await fetch("https://api.spacexdata.com/v4/rockets/query", config);
    let {docs:[{name, mass: {kg:maximo}}= {kg:maxMassRocket}]}= await res.json();
    console.log("Se retorna la masa maxima de todos los cohetes: ", name, maximo);
    return {maximo, name};
}

