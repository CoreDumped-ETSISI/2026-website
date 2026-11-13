import { Container, Title } from "@mantine/core";
import { T } from "../../i18n/lang";
import "../../styles/tablon/Tablon.css";

function Tablon() {
    const projects = ["Proyecto 1", "Proyecto 2", "Proyecto 3", "Proyecto 4"];
    const activities = ["Actividad 1", "Actividad 2", "Actividad 3", "Actividad 4"];
    const hours = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];
    return (
        <div className="tablon-page">
            <Container size="lg" py="xl" pb={120}>
                <Title order={1} mb="xl">
                    <T>Tablón</T>
                </Title>

                <div className="tablon-table-wrapper">
                    <table className="tablon-table">
                        <thead>
                            <tr>
                                <th scope="col">Horario</th>
                                {projects.map((project, index) => (
                                    <th key={index} scope="col">{project}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{hours[0]}</td>
                                {activities.map((activity, index) => (
                                    <td key={index}>{activity}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
}

export default Tablon;