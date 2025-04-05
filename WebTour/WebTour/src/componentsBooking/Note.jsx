import React from "react"
import { Card, Form } from "react-bootstrap"

const Note = ({ formData, handleInputChange }) => {
  return (
    <Card style={{boxShadow: "1px 2px 10px 1px grey"}} className="p-4 mb-4">
      <h4 className="text-center text-primary">GHI CHÚ</h4>
      <span className="text-primary"> (Quý khách có ghi chú gì, xin hãy nói với chúng tôi! Xin cảm ơn!)</span>
      <Form>
        <Form.Group>
          <Form.Control as="textarea" rows={10} placeholder="Nhập ghi chú của bạn..." name="notes" value={formData.notes} 
            onChange={handleInputChange}
            style={{ width: "100%", height: "150px", resize: "vertical" }}
          />
        </Form.Group>
      </Form>
    </Card>
  )
}

export default Note;