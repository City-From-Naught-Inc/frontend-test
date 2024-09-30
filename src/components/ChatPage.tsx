import React, { useState, useEffect } from 'react';
import './ChatPage.css';  // Assume you have a CSS file for layout and styles.
import utils from './utils';


// Define states to manage sidebar widths
interface Course {
  id: string;
  name: string;
  professor_name: string;
  semester: string;
  code: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface Professor {
  id: string;
  name: string;
  course: string;
  description: string;
}

interface Semester {
  year: number;
  name: string;
  semester: string;
  courses: Course[];
}

interface CourseContents {
  filename: string;
  id: string;
}

const ChatPage: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [courseFiles, setCourseFiles] = useState<CourseContents[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');  // Track the message typed by the user
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(20); // Default 20% width
  const [rightSidebarWidth, setRightSidebarWidth] = useState(25); // Default 25% width
  const [isResizingLeft, setIsResizingLeft] = useState(false); 
  const [isResizingRight, setIsResizingRight] = useState(false);


  const handleMouseMoveLeft = (e: MouseEvent) => {
    if (isResizingLeft) {
      const newWidth = (e.clientX / window.innerWidth) * 100; // Calculate percentage width
      if (newWidth > 10 && newWidth < 40) {
        setLeftSidebarWidth(newWidth);
      }
    }
  };
  
  // Handle mouse move for right sidebar resize
  const handleMouseMoveRight = (e: MouseEvent) => {
    if (isResizingRight) {
      const newWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
      if (newWidth > 10 && newWidth < 40) {
        setRightSidebarWidth(newWidth);
      }
    }
  };
  
  // Handle mouse up (stop resizing)
  const stopResizing = () => {
    setIsResizingLeft(false);
    setIsResizingRight(false);
  };

    // Function to handle left sidebar dragging
  const handleLeftSidebarResize = (e: React.MouseEvent) => {
    const newWidth = e.clientX / window.innerWidth * 100; // Calculate percentage width
    if (newWidth > 10 && newWidth < 40) { // Limit min and max width
      setLeftSidebarWidth(newWidth);
    }
  };

  // Function to handle right sidebar dragging
  const handleRightSidebarResize = (e: React.MouseEvent) => {
    const newWidth = (window.innerWidth - e.clientX) / window.innerWidth * 100;
    if (newWidth > 10 && newWidth < 40) { // Limit min and max width
      setRightSidebarWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveLeft);
    window.addEventListener('mousemove', handleMouseMoveRight);
    window.addEventListener('mouseup', stopResizing);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveLeft);
      window.removeEventListener('mousemove', handleMouseMoveRight);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizingLeft, isResizingRight]);
  


  // Fetch semesters with their respective courses on component mount
  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    // Fetch all semesters and courses
    try {
      const data: Semester[] = [
          {
              "courses": [
                  {
                      "code": "ML107",
                      "id": "a7519e21-b624-4204-a55c-6f4c666bc0d0",
                      "name": "ML107",
                      "professor_name": "Joey Sham",
                      "semester": "spring",
                  }
              ],
              "name": "2026 Spring",
              "semester": "spring",
              "year": 2026
          },
          {
              "courses": [
                  {
                      "code": "ML104",
                      "id": "07fa9e8e-959b-425b-8f6e-17bc4161e51f",
                      "name": "ML104",
                      "professor_name": "Joey Sham",
                      "semester": "spring",
                  }
              ],
              "name": "2098 Spring",
              "semester": "spring",
              "year": 2098
          },
          {
              "courses": [
                  {
                      "code": "ML103",
                      "id": "da839bc9-c70a-447b-a863-66499cf8c24d",
                      "name": "ML3",
                      "professor_name": "Joey Sham",
                      "semester": "summer",
                  }
              ],
              "name": "2024 Summer",
              "semester": "summer",
              "year": 2024
          },
          {
              "courses": [
                  {
                      "code": "ML106",
                      "id": "74453225-e86a-454a-b91b-3488e3cdf3cb",
                      "name": "ML106",
                      "professor_name": "Joey Sham",
                      "semester": "winter",
                  }
              ],
              "name": "2025 Winter",
              "semester": "winter",
              "year": 2025
          },
          {
              "courses": [
                  {
                      "code": "101",
                      "id": "993ad197-65cb-41e6-b84e-e30e9233dd93",
                      "name": "se",
                      "professor_name": "leon prof",
                      "semester": "spring",
                  },
                  {
                      "code": "TEST102",
                      "id": "5e57e2e3-853a-4b73-8e73-3568175e77e1",
                      "name": "Joey Test for Anthony",
                      "professor_name": "Joey Sham",
                      "semester": "spring",
                  }
              ],
              "name": "2024 Spring",
              "semester": "spring",
              "year": 2024
          },
          {
              "courses": [
                  {
                      "code": "ML105",
                      "id": "b2d5b2cd-c438-4612-ac4e-96fde071e585",
                      "name": "ML105",
                      "professor_name": "Joey Sham",
                      "semester": "summer",
                  }
              ],
              "name": "2025 Summer",
              "semester": "summer",
              "year": 2025
          }
      ]
      setSemesters(data);
    } catch (error) {
      console.error('Failed to fetch semesters:', error);
    }
  };

  // Toggle expanding/collapsing a semester
  const toggleSemester = (semesterName: string) => {
    setExpandedSemester(expandedSemester === semesterName ? null : semesterName);
  };

  // Fetch course details, historical messages, professor info, and course files when a course is selected
  const fetchCourseDetails = async (course: Course) => {
    setSelectedCourse(course);
    fetchMessages(course.id);
    fetchProfessorInfo(course.id);
    fetchCourseFiles(course.id);
  };

  const fetchMessages = async (courseId: string) => {
    try {
      const response = await fetch(`/v1/courses/${courseId}/messages`);
      const data: Message[] = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchProfessorInfo = async (courseId: string) => {
    try {
      const data: Professor = {
          "course": "ML107",
          "description": "Test",
          "id": "5cbc4470-4510-4b04-84e8-d24a0718b9d4",
          "name": "Joey Sham"
      };
      setProfessor(data);
    } catch (error) {
      console.error('Failed to fetch professor info:', error);
    }
  };

  const fetchCourseFiles = async (courseId: string) => {
    try {
      const data: CourseContents[] = [
          {
              "filename": "2205.15476v1.pdf",
              "id": "05db3108-83c3-4c74-a55a-1bf4d2bc87e5"
          },
          {
              "filename": "2102.09761v3.pdf",
              "id": "6c8c54f7-142d-4b98-8476-95cf56e8af01"
          }
      ]
      setCourseFiles(data);
    } catch (error) {
      console.error('Failed to fetch course files:', error);
    }
  };

  // Handle sending the message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !selectedCourse || !professor) {
      return;
    }

    // Create the message object to send
    const messageToSend = {
      question: newMessage,
      professor_id: professor.id,
      course_id: selectedCourse.id
    };

    // Add the question to the chat (optimistic UI update)
    const studentMessage: Message = {
      id: messages.length + 1,
      sender: 'Student',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, studentMessage]);
    setNewMessage('');  // Clear input after sending

    try {
      const response = await fetch('/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageToSend)
      });

      const data = await response.json();

      if (response.status === 200 && data.answer !== null) {
        // Add the professor's answer to the chat
        const professorMessage: Message = {
          id: messages.length + 2,
          sender: 'Professor',
          content: data.answer,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, professorMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar with semesters and courses */}
      <div className="sidebar" style={{ width: `${leftSidebarWidth}%` }}>
        {semesters.map((semester) => (
          <div key={semester.name}>
            <h3 onClick={() => toggleSemester(semester.name)}>{semester.name}</h3>
            {expandedSemester === semester.name && (
              <div className="course-list">
                {semester.courses.map((course) => (
                  <div
                    key={course.id}
                    className={`course-item ${selectedCourse?.id === course.id ? 'active' : ''}`}
                    onClick={() => fetchCourseDetails(course)}
                  >
                    <div className="course-title">{course.name}</div>
                    <div className="course-professor">{course.professor_name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="resizer" onMouseDown={() => setIsResizingLeft(true)}></div>

      {/* Chat area */}
      <div className="chat-area" style={{ width: `${100 - leftSidebarWidth - rightSidebarWidth}%` }}>
        <h2>{selectedCourse ? `Professor ${selectedCourse.professor_name}` : 'Select a course'}</h2>

        {/* Messages */}
        <div className="messages">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className={`message ${message.sender === 'Professor' ? 'professor-message' : 'student-message'}`}>
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: utils.parseMessageContent(message.content) }} /* Format message content */
                ></div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </div>

        {/* Message input */}
        {selectedCourse && (
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>

      <div className="resizer" onMouseDown={() => setIsResizingRight(true)}></div>

      {/* Professor and course files panel */}
      <div className="right-panel" style={{ width: `${rightSidebarWidth}%` }}>

        {professor && selectedCourse && (
          <>
            <div className="professor-info">
              <div className="profile-pic">JD</div>
              <h3>{professor.name}</h3>
              <p>{selectedCourse.name} | {selectedCourse.semester}</p>
              <p>{professor.description}</p>
            </div>

            <div className="course-files">
              <h3>Course Files</h3>
              <ul>
                {courseFiles.map((file, index) => (
                  <li key={index}>
                    <a href={`/v1/courses/${file.id}/download`}>{file.filename}</a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
