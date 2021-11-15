import { useRouter } from "next/dist/client/router"
import Product from "../components/Product"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import Head from 'next/head'


export default function pid({data,name}) {
    // const products = data.sort((a, b) => a - b) for low to high
    // const products = data.sort((a, b) => b - a) for high to low
    const [filter, setFilter] = useState('');
    const [fVendor,setFVendor] = useState('')
    var products = data
    if(!filter){
        products = data
        console.log("no filter")
    }else if(filter === "lth"){
        products = data.sort((a, b) => a - b)
        console.log("filter low to high")
    }else if(filter === "htl"){
        products = data.sort((a, b) => b - a)
        console.log("filter high to low")
    }
    const router = useRouter()
    
    

    const SelectDiv = ({FilterData,name,price}) =>{
        return(
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth error>
                    <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    sx={{minWidth:"100%",display:"flex",flexDirection:"column",flexWrap:"wrap"}}
                    id="demo-simple-select"
                    value={price?filter:fVendor}
                    label="Filter"
                    onChange={(e)=>{price?setFilter(e.target.value):setFVendor(e.target.value)}}
                    >
                    {
                        FilterData.map(({name,value})=>{
                            return(
                                <MenuItem value={value} >{name}</MenuItem>
                            )
                        })
                    }
                    
                    </Select>
                </FormControl>
            </Box>
        )
    }
    
    const PriceFilter = [{value:"lth",name:"Price: Low to Hight"},{value:"htl",name:"Price: High to Low"}]
    
    return(
        <>
            <Head>
                <title></title>
            </Head>
            <div className="searchHeading">
                <SelectDiv FilterData={PriceFilter} name={"Price"} price={true} />
                <SelectDiv FilterData={PriceFilter} name={"Vendor"} price={false} />
            </div>
                <hr id="srp-line" />
                <br  />
            <div className="searchResultPage">
                {
                    products.filter((pf)=>{
                        if(!fVendor){
                            return pf
                        }else{
                            return pf.vendor === fVendor
                        }
                    }).map(({name,price,url,_id,mediaUrl,brand})=>{
                        return(
                            <Product name={name} price={price} src={mediaUrl[0]} url={`/product/${url}`} key={_id} />
                        )
                    })
                }
                
            </div>
        </>
    )
};

export async function getServerSideProps(){
    
    

    const response = await fetch(`http://localhost:3000/api/product/GetAllProducts`)

    const data = await response.json()
        
    

    return {
        props: {data:data}, // will be passed to the page component as props
      }
}