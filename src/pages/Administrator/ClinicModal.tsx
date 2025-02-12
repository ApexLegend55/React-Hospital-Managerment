import { useState, useEffect, createContext } from "react";
import {
    ListItemIcon,
    ListItemButton,
    Collapse,
    Chip,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
    Box,
    ListItemText,
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
    OutlinedInput,
    Toolbar,
    Container,
    Badge,
    Modal,
    Radio,
    RadioGroup,
    FormLabel
  } from "@mui/material";
import Appbar from "../../components/Appbar";
import { GridOff } from "@mui/icons-material";
import { Form } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";


const ID:string[] = ['NPI', 'EIN', 'PIN', 'PVN', 'SSN', 'TIN', 'DEA', 'DPS', 'NSC', 'UPIN', 'OSCAR', 'BCID', 'BSID', 'NCPDP', 'NPI;NCPDP', 'Champus', 'Medicare', 'Medicaid', 'License', 'Group', 'Other', '&nbsp', 'OB', '1A', '1B', '1C', '1D', '1G', '1H',  'EI', '1J', 'B3', 'BQ', 'FH', 'G2', 'G5', 'LU', 'N5', 'SY', 'U3', 'X5', 'ZZ']
const ALL_TIMES = [
    "07:00 AM", "07:15 AM", "07:30 AM", "07:45 AM",
    "08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM",
    "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM",
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
    "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
    "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
    "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
    "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
    "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
    "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
    "07:00 PM", "07:15 PM", "07:30 PM", "07:45 PM",
    "08:00 PM", "08:15 PM", "08:30 PM", "08:45 PM",
    "09:00 PM", "09:15 PM", "09:30 PM", "09:45 PM",
    "10:00 PM", "10:15 PM", "10:30 PM", "10:45 PM",
    "11:00 PM",
  ];


  
const ClinicModal = () => {

    interface Clinic {
        clinicName: string,
        subTitle: string,
        address1: string,
        address2: string,
        city: string,
        postCode: string,
        country: string,
        state: string,
        telephoneNumber1: string,
        telephoneNumber2: string,
        fax: string,
        email: string,
        id1: string,
        id2: string,
        type1: string,
        type2: string,
        specialization: string,
        slotDuration: string,
        bookingStartTime: string,
        bookingEndTime: string,
    }

    const [clinic, setClinic] = useState<Clinic>({clinicName:'', subTitle:'', address1:'', address2:'', city:'', postCode:'', country:'', state:'', telephoneNumber1:'', telephoneNumber2:'', fax:'', email:'', id1:'', id2:'',type1:'', type2:'', specialization:'', slotDuration:'', bookingStartTime:'', bookingEndTime:''});
    
    const handleClinicChange = (e: React.ChangeEvent<HTMLInputElement |  HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        if (name === 'id1') {
            setClinic((prev) => ({
              ...prev,
              id1: value as string,
            }));
          } else if (name ==='id2') {
            setClinic((prev) => ({
                ...prev,
                id2: value as string,
              }));
          } else if (name === 'slotDuration') {
            setClinic((prev) => ({
                ...prev,
                slotDuration: value as string,
              }));
          }
    }


    const [slotDuration, setSlotDuration] = useState<number>(15); // Default slot duration in minutes
    const [bookingStartTime, setBookingStartTime] = useState<string>("");
    const [bookingEndTime, setBookingEndTime] = useState<string>("");
    const [filteredBookingStartTimes, setFilteredBookingStartTimes] = useState<string[]>([]);
    const [filteredBookingEndTimes, setFilteredBookingEndTimes] = useState<string[]>([]);

    const generateTimeSlots = (start: string, end: string, duration: number) => {
        const startTime = new Date(`1970-01-01T${start.replace(" AM", "").replace(" PM", "")}:00`);
        const endTime = new Date(`1970-01-01T${end.replace(" AM", "").replace(" PM", "")}:00`);
        const slots: string[] = [];
      
        while (startTime < endTime) {
          const hours = startTime.getHours();
          const minutes = startTime.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          const formattedTime = `${(hours % 12 || 12).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
          slots.push(formattedTime);
      
          startTime.setMinutes(startTime.getMinutes() + duration);
        }
      
        return slots;
      };
      
      // Update available start times when slot duration changes
      const handleSlotDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const duration = parseInt(event.target.value, 10);
        setSlotDuration(duration);
        const startTimes = generateTimeSlots("07:00 AM", "11:00 PM", duration);
        setFilteredBookingStartTimes(startTimes);
        setFilteredBookingEndTimes([]); // Reset end times
        setBookingStartTime(""); // Reset start time
        setBookingEndTime(""); // Reset end time
      };
      
      // Update end times when start time changes
      const handleBookingStartTimeChange = (event: SelectChangeEvent) => {
        const selectedStartTime = event.target.value;
        setBookingStartTime(selectedStartTime);
        
        // Convert start time to timestamp
        const selectedStartTimestamp = new Date(`1970-01-01T${selectedStartTime.replace(' AM', '').replace(' PM', '')}:00`).getTime();
      
        // Filter potential end times from the ALL_TIMES array (or any array of times you're using)
        const filteredEndTimes = ALL_TIMES.filter((time) => {
          // Convert end time to timestamp
          const endTimestamp = new Date(`1970-01-01T${time.replace(' AM', '').replace(' PM', '')}:00`).getTime();
          
          // Ensure the end time is after the start time and the time difference is a multiple of slot duration
          return endTimestamp > selectedStartTimestamp && (endTimestamp - selectedStartTimestamp) % (slotDuration * 60 * 1000) === 0;
        });
      
        // Update filtered end times based on start time selection
        setFilteredBookingEndTimes(filteredEndTimes);
        setBookingEndTime(""); // Reset end time if start time changes
      };
      
      
      // Update selected end time
      const handleBookingEndTimeChange = (event: SelectChangeEvent) => {
        setBookingEndTime(event.target.value);
      };
      
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    
    return (
        <div>
            <Button variant="contained" color="error" onClick={handleOpen}>
                Edit Clinic
            </Button>
            <Modal open={open} onClose={()=>{}}>
                <Box
                component="main"
                sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                width:"600px",
                borderRadius: "8px",
                padding: "0px",
                position: "absolute",
                top: "50%",
                left: "50%",
                boxShadow: "24px",
                transform: "translate(-50%, -50%)",
                } }
                >
                    <Box sx={styles.bar}>
                        <Typography variant="h6">Edit Clinic</Typography>
                        <Box>
                            <IconButton aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Container sx={{ mt: 4, mb: 4,height:"600px",overflow: "auto",}}>    
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column"}} >                    
                            <Grid
                                container
                                spacing={2}
                                sx={{ marginleft: "10px", padding: "20px"}}

                            >
                                
                                <Grid item xs={12} sm={12} md={12}>
                                    <div className="clinic" style={styles.container}>
                                        <h2>Clinic</h2>
                                        <div className="clinc-name" style={styles.container}>
                                            <Checkbox/>
                                            <label>Clinic Name:</label>
                                            <Grid item xs={12}>
                                                <TextField 
                                                    id="clinic-name"
                                                    fullWidth
                                                    multiline 
                                                    variant="standard"
                                                    value={clinic.clinicName}
                                                    name="clinicName"
                                                    onChange={handleClinicChange}
                                                      />
                                            </Grid>   
                                        </div>
                                        <div className="Other Information" style={styles.container}>
                                            <Checkbox />
                                            <label>Other Information</label>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="other-information-subtitle"
                                                        label="Subtitle"
                                                        fullWidth
                                                        multiline
                                                        variant="standard"
                                                          
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="other-information-address"
                                                        label="Address(line1)"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="other-information-address"
                                                        label="Address(line2)"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-information-city"
                                                        label="City"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-information-post-code"
                                                        label="Post Code"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-information-country"
                                                        label="Country"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-information-state"
                                                        label="State"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-information-telephone-1"
                                                        label="Telephone-1"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-inofrmation-telephone-2"
                                                        label="Telephone-2"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-information-fax"
                                                        label="Fax"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="other-information-email"
                                                        label="Email"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                                <Grid item xs={12} container columnSpacing={1} alignItems={"end"}>
                                                    <Grid item xs={2} sx={{mt:2}}><label>ID #1:</label></Grid>
                                                    <Grid item xs={5} sx={{mt:1}}>
                                                        <TextField
                                                            id="other-information-id-1"
                                                            fullWidth
                                                            multiline
                                                            variant="standard"
                                                             
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} sx={{mt:1}}>
                                                        <FormControl variant="standard" fullWidth>
                                                            <Select
                                                                id="other-information-id-1"
                                                                value={clinic.id1}
                                                                onChange={handleClinicChange}
                                                                name="id1"
                                                            >
                                                                {ID.map((name) => (
                                                                <MenuItem key={name} value={name}>                                        
                                                                    <ListItemText primary={name} />
                                                                </MenuItem>
                                                                ))} 
                                                                
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                                <Grid container item xs={12} columnSpacing={1} alignItems={"end"}>
                                                    <Grid item xs={2} sx={{mt:2}}><label>ID #2:</label></Grid>
                                                    <Grid item xs={5} sx={{mt:1}}>
                                                        <TextField
                                                            id="other-information-id-2"
                                                            fullWidth
                                                            multiline
                                                            variant="standard"
                                                             
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} sx={{mt:10}}>
                                                        <FormControl variant="standard" fullWidth>
                                                            <Select
                                                                id="other-information-id-2"
                                                                value={clinic.id2}
                                                                onChange={handleClinicChange}
                                                                name="id2"
                                                            >
                                                                {ID.map((name) => (
                                                                <MenuItem key={name} value={name}>                                        
                                                                    <ListItemText primary={name} />
                                                                </MenuItem>
                                                                ))} 
                                                                
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="other-information-specialization"
                                                        label="Specialization"
                                                        fullWidth
                                                        variant="standard"
                                                         
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="appointment-book" style={styles.container}>
                                            <Checkbox/>
                                            <label>Appointment Book</label>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <FormLabel id="appointment-book-slot-duration">Slot Duration</FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="appointment-book-slot-duration"
                                                            name="slotDuration"
                                                            value={slotDuration}
                                                            onChange={handleSlotDurationChange}
                                                        >
                                                            <FormControlLabel value={5} control={<Radio />} label="5 Minutes" />
                                                            <FormControlLabel value={10} control={<Radio />} label="10 Minutes" />
                                                            <FormControlLabel value={15} control={<Radio />} label="15 Minutes" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="appointment-book-bookings-start-at">Bookings start at</InputLabel>
                                                        <Select
                                                            id="appointment-book-bookings-start-at"
                                                            
                                                            value={bookingStartTime}
                                                            onChange={handleBookingStartTimeChange}
                                                            >
                                                                {filteredBookingStartTimes.map((time) => (
                                                                    <MenuItem key={time} value={time}>
                                                                    {time}
                                                                    </MenuItem>
                                                                ))}
                                                                
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="appointment-book-bookings-end-at">Bookings end at</InputLabel>
                                                        <Select
                                                            id="appointment-book-bookings-end-at"
                                                            disabled={!bookingStartTime}
                                                            value={bookingEndTime}
                                                            onChange={handleBookingEndTimeChange}
                                                            >
                                                                {filteredBookingEndTimes.map((time) => (
                                                                    <MenuItem key={time} value={time}>
                                                                    {time}
                                                                    </MenuItem>
                                                                ))} 
                                                                
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Grid item xs={12} sx={{ mt:2, display:'flex', justifyContent:'right'}}>
                                            <Button variant="contained" color="success" sx={{mr:3}}>
                                                Save
                                            </Button>
                                            <Button variant="outlined" color="success" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                        
                                    </div>
                                </Grid>
                                
                            </Grid>
                        </Paper>     
                        
                    </Container>
                </Box>
            </Modal>
        
    </div>
    );

}

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
    bar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "green",
        color: "white",
        padding: "8px 8px",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        boxShadow: "24px",
        width: "600px",
        height: "600px",
        borderRadius: "8px",
        padding: "0px",
    },
   
};

export default ClinicModal;

