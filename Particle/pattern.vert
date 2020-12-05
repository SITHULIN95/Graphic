
out  vec3  vN;		// normal vector
out  vec3  vL;		// vector from point to light
out  vec3  vE;		// vector from point to eye

uniform float	uTime;		// "Time", from Animate( )
out vec2  	vST;		// texture coords

const float PI = 	3.14159265;
const float AMP = 	0.2;		// amplitude
const float W = 	2.;		// frequency

vec3 LightPosition = vec3(  0., 5., 5. );
uniform float	uA;
uniform float	uB;
uniform bool	uT;
uniform bool	uT1;



attribute float aPointx;
attribute float aPointy;
attribute float aPointz;

uniform float	uPP;

void
main( )
{ 
	vec3 vert = gl_Vertex.xyz;
	vec4 ECposition = gl_ModelViewMatrix * vec4( vert, 1. );
	vN = normalize( gl_NormalMatrix * gl_Normal );	// normal vector
	vL = LightPosition - ECposition.xyz;		// vector from the point
							// to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz;	// vector from the point
							// to the eye position 


    vST = gl_MultiTexCoord0.st;
	
	vert.x=gl_Color.r;
	vert.y=gl_Color.g;
	vert.z=gl_Color.b;
	
	
	
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
}