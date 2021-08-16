import React, { useCallback, useEffect, useState } from "react";
import { Accordion, AccordionSummary } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Typography } from ".";
import COLOR from "../../styles/Color";
import {
  setHighlightCategory,
  removeHighlightCategory,
} from "../../store/actions/categories";
import { CategoriesState } from "../../types/types";

type Props = {
  name: string;
  className?: any;
};

const CategoryTypography = styled(Typography)`
  color: white;
  font-weight: bold;
`;

const CategoryItem = ({ name, className }: Props) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const highlightedCategory = useSelector(
    (state: CategoriesState) => state.highlightedCategory
  );

  useEffect(() => {
    if (highlightedCategory !== name) {
      setExpanded(false);
    }
  }, [highlightedCategory, name]);

  const toggleExpanded = useCallback(() => {
    setExpanded((currExpanded) => !currExpanded);
    if (expanded) {
      dispatch(removeHighlightCategory());
    } else {
      dispatch(setHighlightCategory(name));
    }
  }, [expanded, dispatch, name]);

  const accordionBackgroundColor = expanded ? COLOR.SECONDARY : COLOR.PRIMARY;

  return (
    <Accordion
      expanded={expanded}
      onChange={toggleExpanded}
      className={className ? className : undefined}
      style={{ width: 600, backgroundColor: accordionBackgroundColor }}
    >
      <AccordionSummary aria-controls="panel4bh-content" id="panel4bh-header">
        <CategoryTypography>{name}</CategoryTypography>
      </AccordionSummary>
    </Accordion>
  );
};

export default CategoryItem;
