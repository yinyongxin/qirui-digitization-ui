import { forwardRef } from "react"
import Text from "../Text"
import Title from "../Title"

const Typography = () => {
  return (<></>)
}

const TypographyForwardRef = forwardRef(Typography)

TypographyForwardRef.displayName = 'Typography'

type TypographyForwardRefType = typeof TypographyForwardRef

interface TypographyComponet extends TypographyForwardRefType {
  Text: typeof Text
  Title: typeof Title
}

const TypographyComp: TypographyComponet = TypographyForwardRef as TypographyComponet

TypographyComp.Text = Text

TypographyComp.Title = Title

export default TypographyComp