import { Card, CardWrapper } from "@/styles/routes/projects.styled";
import type { IProject } from "@/types/Post";
import { motion } from "framer-motion";
import { memo } from "react";

export const Project = memo(
  ({ data: { id, slug, title, description, colors } }: { data: IProject }) => {
    return (
      <CardWrapper>
        <Card key={id} to={slug} main={colors.main} bg={colors.bg}>
          <motion.span
            layoutId={`project-title-${id}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {title}
          </motion.span>
          <span>{description}</span>
        </Card>
      </CardWrapper>
    );
  }
);
