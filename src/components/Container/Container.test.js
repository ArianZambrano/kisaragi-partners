import Container from "./Container";
import { render, screen } from "@testing-library/react";

beforeEach(()=> {
    const {childrenComponent} = render(<div>Test container</div>)
    render(<Container>{childrenComponent}</Container>)
})

test('Hijo dentro de Container', () => {
    expect(screen.getByText('Test container')).toBeInTheDocument()
})