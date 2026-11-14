import { Container, Title } from "@mantine/core";
import { T } from "../../i18n/lang";
import "../../styles/tablon/Tablon.css";

function Tablon() {
    const projects = ["Proyecto 1", "Proyecto 2", "Proyecto 3", "Proyecto 4"];
    const activities = [["Actividad 1", "Actividad 2", "Actividad 3", "Actividad 4"], ["Actividad 5", "Actividad 6", "Actividad 7", "Actividad 8"], ["Actividad 9", "Actividad 10", "Actividad 11", "Actividad 12"], ["Actividad 13", "Actividad 14", "Actividad 15", "Actividad 16"], ["Actividad 17", "Actividad 18", "Actividad 19", "Actividad 20"], ["Actividad 21", "Actividad 22", "Actividad 23", "Actividad 24"], ["Actividad 25", "Actividad 26", "Actividad 27", "Actividad 28"], ["Actividad 29", "Actividad 30", "Actividad 31", "Actividad 32"]];
    const hours = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];
    return (
        <div id="tablon-page">
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
                            {
                                hours.map((hour, i) => (
                                    <tr key={i}>
                                        <td>{hour}</td>
                                        {activities[i].map((activity, index) => (
                                            <td key={index}>{activity}</td>
                                        ))}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
}

export default Tablon;