package hos.webapp.tnguyen.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> students = Arrays.asList(
                new Student(
                        1L,
                        "URBAN GRID: RYE",
                        "60 DAYS",
                        Gender.ACTIVE),
                new Student(
                        2L,
                        "NOVIS: POSSUM KINGDOM",
                        "90 DAYS",
                        Gender.INACTIVE)
        );
        return students;
    }
}