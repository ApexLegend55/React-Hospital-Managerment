import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import '../../styles.css'
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
  Paper,
  IconButton,
  Avatar
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import { Link, useParams } from "react-router-dom";

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

const PatientInfo = ({ patients }: any) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients?.find(
    (patient: any) => patient.id === parseInt(id || "", 10)
  );
  const initialValues = {
    id: patient.id,
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
      <Appbar appBarTitle="General" />
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
                        <div className="right">
                          <label htmlFor="contained-button-file">
                            
                          </label>
                        </div>
                      </div>
                        </Grid>  
                      
                     <Grid container spacing={2} style={{alignItems:'center'}}>
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
                          <IconButton component={Link} to="/patient-list" color="inherit">
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
                                src="img/doctor.jpg" 
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
                        <div className="contact-info" style={styles.container} >
                            <h2>Contact Information</h2>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>ID:</label>
                                <input width="80%" type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>MRN:</label>
                                <input  type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>DOB:</label>
                                <input type="date" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Gender:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Marriage:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Siblings:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Race:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Pharmacy:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Other:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                          </div>
                          <div style={styles.container}>
                            <h2>Contact Information</h2>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Address:</label>
                                <input type="text" placeholder="Delmas65" style={styles.input} />
                              </div>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>City:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Postcode:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Country:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>State:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Home Ph:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Cell Ph:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Email:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Emergency:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                          </div>                          
                        </Grid>  
                        <Grid item xs={6} sm={6}>
                          <div style={styles.container}>
                            <h2>Insurance 1</h2>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Carrier:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Address:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>City:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Postcode:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Country:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>State:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Phone:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Facsimile:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Plan:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Expiry:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>ID No:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Group No:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Copay:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Auth No:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Remarks:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <div style={styles.field}>
                                <label>Plan:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                          </div>  
                          <div style={styles.container}>
                            <h2>Work Information</h2>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Status:</label>
                                <input type="text" placeholder="Delmas65" style={styles.input} />
                              </div>
                            </Grid>                                                                            
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Employer:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <div style={styles.field}>
                                <label>Work Ph:</label>
                                <input type="text" placeholder="" style={styles.input} />
                              </div>
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
  },
  input: {
    flex: 1,
    marginLeft: '10px',
    padding: '5px',
    border: '1px solid lightgray',
    borderRadius: '3px',
  },
 
};

export default PatientInfo;
