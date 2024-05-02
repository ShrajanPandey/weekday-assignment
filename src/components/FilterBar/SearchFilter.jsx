import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { addFilterCondition } from "../../redux/JobOpeningsSlice";
import { useDispatch } from "react-redux";
import { FILTER_TAG_RESPONSE_FIELD_MAPPING } from "../../constants/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/*
 *   Author - Shrajan Pandey
 *
 *   Input with options to select
 *   Values fetched from Constants -> for populating the options and also for displaying all Filters
 */
function SelectFilter(props) {
    const { tag, names } = props;
    const dispath = useDispatch();
    const [input, setInput] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setInput(typeof value === "string" ? value.split(",") : value);

        const mappedField = FILTER_TAG_RESPONSE_FIELD_MAPPING[tag];
        const condition = {
            mappedField: mappedField,
            values: [...value],
        };

        dispath(addFilterCondition(condition));
    };

    return (
        <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-checkbox-label">{tag}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={input}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={input.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SelectFilter;
