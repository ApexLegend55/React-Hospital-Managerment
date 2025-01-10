import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  SelectChangeEvent,
  Paper,
  IconButton,
  FormControlLabel,
  FormControl,
  Checkbox,
  Avatar,
  Input,
  InputAdornment,
  OutlinedInput
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from '@mui/icons-material/Delete';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import { Link, useParams } from "react-router-dom";
import SelectLocation from "../../components/Encounter/SelectLocation";
import SelectQuality from "../../components/Encounter/SelectQuality";



import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import '../../styles.css'


const PatientInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Phone number must contain only digits"),
  email: Yup.string().email("Invalid email").required("Required"),
  age: Yup.number().required("Required").positive("Age must be positive"),
  bloodGroup: Yup.string().required("Required"),
  referredByDoctor: Yup.string().required("Required"),
  referredByDoctorEmail: Yup.string().email("Invalid email"),
  referredByDoctorPhoneNumber: Yup.string().matches(
    /^\d+$/,
    "Phone number must contain only digits"
  ),
  diseases: Yup.string().required("Required"),
  patientHistory: Yup.string(),
});

const PatientEncounterInfo = ({ patients }: any) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients?.find(
    (patient: any) => patient.id === parseInt(id || "", 10)
  );

  const initialValues = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    address: patient.address,
    phoneNumber: patient.phoneNumber,
    email: patient.email,
    age: patient.age,
    bloodGroup: patient.bloodGroup,
    referredByDoctor: patient.referredByDoctor,
    referredByDoctorEmail: patient.referredByDoctorEmail,
    referredByDoctorPhoneNumber: patient.referredByDoctorPhoneNumber,
    diseases: patient.diseases,
    patientHistory: patient.patientHistory,
  };
  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log(values);
    //resetForm();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="History" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid
              container
              spacing={2}
              sx={{ marginleft: "10px", padding: "20px" }}
            >           
              <Grid item xs={12}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={PatientInfoSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    
                    <Form>
                      <Grid item xs={12} sm={12}>
                      <div className="setside">
                        <div className="left">
                          <IconButton component={Link} to="/patient-list" color="inherit">
                            <ArrowBackIcon />
                          </IconButton>
                        </div>                        
                      </div>
                        </Grid>  
                      
                     <Grid container spacing={2} sx={{justifyContent: "space-between",alignItems: "center",}}>
                        <Grid item xs={12} sm={2}>
                          <Field
                            as={TextField}
                            name="id"
                            label="Chart"
                            fullWidth
                          />
                          
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            fullWidth
                            error={errors.firstName && touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            error={errors.lastName && touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                          />
                        </Grid>                     
                        <Grid item xs={12} sm={1}>
                          <Field
                            as={TextField}
                            name="age"
                            label="Age"
                            fullWidth
                            error={touched.age && Boolean(errors.age)}
                            helperText={touched.age && errors.age}
                          />
                        </Grid>
                        <Grid item xs={12} sm={1} style={{textAlign:'right'}}>
                          <IconButton component={Link} to="/pdf-viewer" color="inherit">
                            <DocumentScannerIcon                              
                              style={{
                                width:"50px",
                                height: "50px",
                              }}
                            ></DocumentScannerIcon>
                          </IconButton>
                        </Grid>
                      
                        <Grid item xs={12} sm={2} style={{textAlign:'right', padding:'0'}}>
                          <IconButton style={{padding:'0'}}>
                              <Avatar 
                                variant="square"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                }} 
                                />
                          </IconButton>
                        </Grid>
                      
                      </Grid>                     
                      <Grid container spacing={2}>                        
                        <Grid item xs={6} sm={6}>
                        <div className="contact-information" style={styles.container}>
                            <Grid container rowSpacing={1}>
                              <Grid xs={4}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Encounter"
                                  multiline
                                  variant="standard"
                                  disabled
                                  fullWidth
                                />
                              </Grid>
                              <Grid xs={4}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Date"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                />
                              </Grid>
                              <Grid xs={4}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Type"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                />
                              </Grid>
                              
                              <TextField
                                id="outlined-multiline-static"
                                label="Attended by"
                                multiline
                                variant="standard"
                                fullWidth
                              />                             
                            </Grid>                       
                          </div>
                          <div className="past-medical-history" style={styles.container} >
                            <h2>Chief Complaint / Encounter Reason</h2>
                              <TextField 
                                id="past-medical-history"
                                fullWidth
                                InputProps={{
                                  style: {
                                    borderRadius: "0px",
                                  }
                                }}
                                multiline 
                                rows={2}
                                placeholder="Please write the past medical history" />
                          </div>  
                          <div style={styles.container}>
                            <h2>History of Present Illness</h2>
                            <Grid item xs={12} sm={12}>
                              <TextField 
                                  id="past-medical-history"
                                  fullWidth
                                  InputProps={{
                                    style: {
                                      borderRadius: "0px",
                                    }
                                  }}
                                  multiline 
                                  rows={2}
                                  placeholder="Please write the past medical history" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                <SelectLocation/>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                  <SelectQuality width={490}/>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Severity:</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Duration:</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Onset-Timing:</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Context:</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Modifying Factors:</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Signs-Symptoms:</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                            </Grid>                            
                          </div>                         
                          <div style={styles.container}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={12}>
                                <h2>Vital Signs</h2> 
                              </Grid>                           
                              <Grid item xs={3} sm={3} md={3}>
                                <div style={styles.field}>
                                  <label >BP:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                  <label >/</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                </div>
                                <div style={styles.field}>
                                  <label >Tp:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                  <label >Tp:</label>
                                </div>
                              </Grid>                                                                            
                              <Grid item xs={3} sm={3} md={3}>
                                <div style={styles.field}>
                                  <label>PR:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                </div>
                                <div style={styles.field}>
                                  <label>RR:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                </div>
                              </Grid>
                              <Grid item xs={3} sm={3} md={3}>
                                <div style={styles.field}>
                                  <label>Ht:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                </div>
                                <div style={styles.field}>
                                  <label>Wt:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                </div>
                              </Grid>
                              <Grid item xs={3} sm={3} md={3}>
                                <div style={styles.field}>
                                  <label>Waist:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                </div>
                                <div style={styles.field}>
                                  <label>SpO2:</label>
                                  <TextField id="standard-basic"  variant="standard" />
                                </div>
                              </Grid>                           
                            </Grid>
                          </div> 
                          <div style={styles.container}>
                            <h2>Review of Systems</h2>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="General" />
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Eyes" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="ENMT" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Cardiovascular" />
                            </Grid> 
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Respiratory" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Gastrointestinal" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Genitourinary Male" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Genitourinary Female" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Musculoskeletal" />
                            </Grid>   
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Skin" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Neurologic" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Psychiatric" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Endocrine" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Hematologic-Lymphatic" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Allergic-Immunologic" />
                            </Grid> 
                            <Grid item xs={12} sm={12}>
                              <TextField fullWidth sx={{ m: 1 }} id="standard-basic"  variant="standard" />
                            </Grid> 
                                                                                          
                            
                          </div>
                          <div style={styles.container}>
                            <Grid container spacing={2}>                            
                              <Grid item xs={12} sm={12}>
                                <FormControlLabel control={<Checkbox  />} label="Reviewed Past, Family and Social History" />
                              </Grid> 
                              <Grid item xs={6} sm={6}>                              
                                  <FormControlLabel control={<Checkbox  />} label="Obtained old records" />
                                  <FormControlLabel control={<Checkbox  />} label="Interpreted tests data" />
                              </Grid>
                              <Grid item xs={6} sm={6}>
                                  <FormControlLabel control={<Checkbox  />} label="Summarized old records" />
                                  <FormControlLabel control={<Checkbox  />} label="Discussed / Reviewed tests" />                              
                              </Grid>
                            </Grid>
                          </div> 
                          <div style={styles.container}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={12}>
                                <h2>Vital Signs</h2> 
                              </Grid>                                                         
                              <Grid item xs={2} sm={2} md={2}>
                                <FormControl fullWidth  variant="standard">                                
                                    <Input
                                      id="standard-adornment-amount"
                                      startAdornment={<InputAdornment position="start">Code:</InputAdornment>}
                                    />
                                </FormControl>
                              </Grid> 
                              <Grid item xs={9} sm={9} md={9}>
                                <FormControl fullWidth  variant="standard">                                
                                  <Input
                                    id="standard-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Desc:</InputAdornment>}
                                  />
                                </FormControl>                                                        
                              </Grid>  
                              <Grid item xs={1} sm={1} md={1}>
                                <IconButton  color="inherit">
                                    <DeleteIcon />
                                </IconButton>                                                      
                              </Grid>                                                                         
                              <Grid item xs={11} sm={11} md={11}>
                                <FormControl fullWidth  variant="standard">                                
                                    <Input
                                      id="standard-adornment-amount"
                                      startAdornment={<InputAdornment position="start">Note:</InputAdornment>}
                                    />
                                  </FormControl>
                              </Grid>                                                         
                            </Grid>
                          </div>                                               
                        </Grid>                          
                        <Grid item xs={6} sm={6}>
                          <div style={styles.container}>
                            <h2>Physical Examination</h2>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Constitutional" />
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Eyes" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Neck" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Respiratory" />
                            </Grid> 
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Cardiovascular" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Breasts" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Gastrointestinal" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Genitourinary Female" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Genitourinary Male" />
                            </Grid>   
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Lymphatic" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Musculoskeletal" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Skin" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Neurologic" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel control={<Checkbox  />} label="Psychiatric" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <TextField fullWidth sx={{ m: 1 }} id="standard-basic"  variant="standard" />
                            </Grid>                   
                          </div> 
                          <div style={styles.container}>
                            <h2>Order / Requistion</h2>
                            <Grid container spacing={2}>                               
                              <Grid item xs={1} sm={1} md={1}>                                
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                  <label style={{marginRight:'4px'}}>1</label>
                                  <TextField id="input-with-sx" variant="standard" />
                                </Box>
                              </Grid>                             
                              <Grid item xs={9} sm={9} md={9}>                                
                                <FormControl fullWidth  variant="standard">                                
                                    <Input
                                      id="standard-adornment-amount"
                                      startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    />
                                </FormControl>
                              </Grid>
                              <Grid item xs={1} sm={1} md={1}>
                                <FormControl fullWidth  variant="standard">                                
                                    <Input
                                      id="standard-adornment-amount"
                                      startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    />
                                </FormControl>
                              </Grid>   
                              <Grid item xs={1} sm={1} md={1}>
                                <IconButton  color="inherit">
                                  <DeleteIcon />
                                </IconButton>   
                              </Grid>                                            
                            </Grid>
                          </div>                        
                        </Grid>                      
                      </Grid>                     
                      <br />
                      <Grid container justifyContent="flex-end">
                        <Grid item xs={2} sm={1}>
                          <Button
                            component={Link}
                            to="/patient-list"
                            color="inherit"
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button type="submit" variant="contained">
                            Save
                          </Button>                          
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button 
                           component={Link}
                           to={`/patient-info-history/${patient.id}`}
                           color="warning"
                           variant="contained"
                           >
                            History
                          </Button>                          
                        </Grid>s
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};


const styles = {
  container: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding: '20px',
    margin: 'auto',
    marginTop: '20px',
  },
  header: {
    textAlign: 'center',
  },
   subHeader: {
    marginTop: '20px',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    marginLeft: '10px',
    width:'20%',
  },
  input: {
    flex: 1,
    marginLeft: '10px',
    padding: '5px',
    border: '1px solid lightgray',
    borderRadius: '3px',
  },
 
};
export default PatientEncounterInfo;
