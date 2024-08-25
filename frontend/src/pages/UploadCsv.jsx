import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/UploadCsv.css";
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DataGrid } from '@mui/x-data-grid';
import { VisuallyHiddenInput} from '../components/StyledComponents';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import ProductForm from "../components/ProductForm";
import { Select } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import qs from 'qs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function UploadCsv() {
    const [fileName, setFileName] = useState("");
    const [productInfo, setProductInfo] = useState([]);
    const [openEditPopup, setOpenEditPopup] = useState(false)
    const [editProductdetails, setEditProductDetails] = useState({})
    const [searchfield, setSearchfield] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [filter,setFilter] = useState("")

    useEffect(() => {
        getGrid()

    }, [])

    const getGrid = (filter) => {
        const params = filter
        api.get("api/product/search/",{params,paramsSerializer:p => qs.stringify(p)})
            .then(res => res.data)
            .then(data => setProductInfo(data))
            .catch(err => console.log(err))
    }

    const onClickEdit = (productDetails) => {
        setOpenEditPopup(true)
        setEditProductDetails(productDetails)
    }

    const onCloseEditPopup = () => {
        setOpenEditPopup(false)
        setEditProductDetails({})
        getGrid()
    }

   const handleSearchClick =() =>{
    let filter = {[searchfield]:searchValue}
     setFilter(filter)
     if(searchfield && searchValue){
        getGrid(filter)
     }
     else 
      getGrid()
     
   }

    const columns =
        [{ field: 'store_id', headerName: 'Store ID', editable: true, width:250,searchable: true },
        {
            field: 'sku',
            headerName: 'SKU',
            width: 250,
            editable: true,
            searchable: true
        },
        {
            field: 'product_name',
            headerName: 'Product Name',
            width: 250,
            editable: true,
            searchable: true
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 210,
            editable: true,
            searchable: true
        },
        {
            field: 'date',
            headerName: 'Date',
            sortable: true,
            editable: true,
            width: 210,
            searchable: true
        },
        
        {
            field: 'edit',
            type: 'action',
            headerName: 'Edit',
            searchable: false,
            editable: false,
            width: 110,
            renderCell: (params) => (
                <div>
                    <EditIcon style={{cursor:"pointer"}} onClick={e => onClickEdit(params?.row)} />
                </div>
            )
        }
        ];


    const onSubmitUploadCsv = async (file) => {
        let formData = new FormData();
        formData.append("csv_file", file)
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        await api
            .post("/api/upload/", formData, axiosConfig)
            .then((res) => {alert(`File ${file?.name} Uploaded Successfully`);})
            .catch(err => alert(`File upload failed: ${err}`))
            .finally(() => {getGrid() ; setFileName("")})
    }

    return (

        <div>
            <h1>Products List</h1>
            <Box sx={{ height: 800, width: '100%' }}>
                <div className="maingrid">
                    <div>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<FileUploadIcon />}
                            size="small"
                        >
                            Upload file
                            <VisuallyHiddenInput className="uploadInput" type="file" onChange={e => { console.log(e.target.files); setFileName(e.target.files[0].name); onSubmitUploadCsv(e.target.files[0]) }} />
                        </Button>
                        <span className="fileNameHeader">{fileName}</span>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label" style ={{ top: "-10px"}}>Select Column</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-helper"
                                    value={searchfield}
                                    label="Select Columns"
                                    onChange={e => setSearchfield(e.target.value)}
                                     style={{ width: "200px", height: "38px" ,borderRadius:"0px"}}
                                >
                                    <MenuItem value="">Select Columns</MenuItem>
                                    {columns.filter(field => field?.searchable)?.map(field => {
                                        return <MenuItem value={field?.field}>{field?.headerName}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <span>
                           
                                <input
                                    type="text"
                                    placeholder="Search…"
                                    onChange={e => setSearchValue(e.target.value)}
                                    style={{ width: "200px", height: "32px",borderRadius:"0px" }}
                                />
                                 <SearchIcon onClick={e => {console.log("search");handleSearchClick(e)}} style ={{position:"absolute",right: "10px",padding: "10px", cursor:"pointer"}} />
                                
                            </span>
                        </div>
                    </div>
                </div>
                <DataGrid
                    rows={productInfo}
                    columns={columns}
                    pageSizeOptions={[20]}
                />
            </Box>
            <Dialog
                open={openEditPopup}
                onClose={onCloseEditPopup}
                 aria-labelledby="alert-dialog-title"
                 aria-describedby="alert-dialog-description"
            >  
                <DialogTitle id="alert-dialog-title">
          {"Product Details"}
        </DialogTitle>
        <DialogContent>
                <ProductForm productData={editProductdetails} onPopupClose={() => { onCloseEditPopup() }} />
                </DialogContent>
             </Dialog>
        </div>

    );
}

export default UploadCsv