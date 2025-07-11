import { useState } from 'react';
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Checkbox, 
    ListItemText, 
    OutlinedInput, 
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Button,
    Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Filter = ({ onFilterChange }) => {
    const [name, setName] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [workLocations, setWorkLocations] = useState([]);
    
    const locationOptions = ['Hartford', 'St. Paul', 'Remote'];
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleJobRoleChange = (event) => {
        setJobRole(event.target.value);
    };
    
    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setWorkLocations(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    
    const handleApplyFilters = () => {
        const filters = {
            name: name.trim(),
            jobRole: jobRole.trim(),
            workLocation: workLocations.length > 0 ? workLocations.join(',') : ''
        };
        
        onFilterChange(filters);
    };
    
    const handleClearFilters = () => {
        setName('');
        setJobRole('');
        setWorkLocations([]);
        onFilterChange({});
    };

    const hasActiveFilters = name || jobRole || workLocations.length > 0;
    
    return (
        <Box sx={{ 
            p: 0, 
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden'
        }}>
            <Box sx={{ 
                p: 2, 
                background: 'linear-gradient(to bottom, #ec7878, #ffffff)',
                color: 'white'
            }}>
                <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'black'
                }}>
                    <SearchIcon />
                    Search Filters
                </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Search by Name"
                        variant="outlined"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter employee name..."
                        size="small"
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            }
                        }}
                    />
                </Box>                
                <Accordion 
                    elevation={0} 
                    sx={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px !important',
                        mb: 2,
                        '&:before': {
                            display: 'none',
                        }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="location-filter-content"
                        id="location-filter-header"
                        sx={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            '&.Mui-expanded': {
                                borderRadius: '8px 8px 0 0',
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 500 }}>Work Location</Typography>
                            {workLocations.length > 0 && (
                                <Chip 
                                    label={workLocations.length} 
                                    size="small" 
                                    sx={{ 
                                        minWidth: '24px', 
                                        height: '20px',
                                        background: 'linear-gradient(to bottom, #ec7878, #ffffff)',
                                        color: 'white'
                                    }}
                                />
                            )}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="location-checkbox-label">Select Locations</InputLabel>
                            <Select
                                labelId="location-checkbox-label"
                                id="location-checkbox"
                                multiple
                                value={workLocations}
                                onChange={handleLocationChange}
                                input={<OutlinedInput label="Select Locations" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" />
                                        ))}
                                    </Box>
                                )}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    }
                                }}
                            >
                                {locationOptions.map((location) => (
                                    <MenuItem key={location} value={location}>
                                        <Checkbox checked={workLocations.indexOf(location) > -1} />
                                        <ListItemText primary={location} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion 
                    elevation={0} 
                    sx={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px !important',
                        mb: 3,
                        '&:before': {
                            display: 'none',
                        }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="job-role-filter-content"
                        id="job-role-filter-header"
                        sx={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            '&.Mui-expanded': {
                                borderRadius: '8px 8px 0 0',
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 500 }}>Job Role</Typography>
                            {jobRole && (
                                <Chip 
                                    label="1" 
                                    size="small" 
                                    sx={{ 
                                        minWidth: '24px', 
                                        height: '20px',
                                        background: 'linear-gradient(to bottom, #ec7878, #ffffff)',
                                        color: 'white'
                                    }}
                                />
                            )}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Job Role"
                            variant="outlined"
                            value={jobRole}
                            onChange={handleJobRoleChange}
                            placeholder="Enter job role..."
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                }
                            }}
                        />
                    </AccordionDetails>
                </Accordion>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                        variant="outlined" 
                        onClick={handleClearFilters}
                        disabled={!hasActiveFilters}
                        startIcon={<ClearIcon />}
                        sx={{
                            flex: 1,
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            color: 'black'
                        }}
                    >
                        Clear
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleApplyFilters}
                        startIcon={<SearchIcon />}
                        sx={{
                            flex: 1,
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            color: 'black',
                            background: 'linear-gradient(to bottom, #ec7878, #ffffff)',
                            '&:hover': {
                                background: 'linear-gradient(to bottom, #d65a5a, #f0f0f0)',
                            }
                        }}
                    >
                        Apply
                    </Button>
                </Box>

                {hasActiveFilters && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#666' }}>
                            Active Filters:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {name && (
                                <Chip 
                                    label={`Name: ${name}`} 
                                    size="small" 
                                    variant="outlined"
                                    onDelete={() => setName('')}
                                />
                            )}
                            {jobRole && (
                                <Chip 
                                    label={`Role: ${jobRole}`} 
                                    size="small" 
                                    variant="outlined"
                                    onDelete={() => setJobRole('')}
                                />
                            )}
                            {workLocations.map((location) => (
                                <Chip 
                                    key={location}
                                    label={`Location: ${location}`} 
                                    size="small" 
                                    variant="outlined"
                                    onDelete={() => setWorkLocations(workLocations.filter(loc => loc !== location))}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Filter;