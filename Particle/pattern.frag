
uniform float   uKa, uKd, uKs;		// coefficients of each type of lighting
uniform vec3  uColor;			// object color
uniform vec3  uSpecularColor;		// light color
uniform float   uShininess;		// specular exponent
uniform float   uS0,uT0,uSize;		// specular exponent


in  vec2  vST;			// texture coords
in  vec3  vN;			// normal vector
in  vec3  vL;			// vector from point to light
in  vec3  vE;			// vector from point to eye

uniform float	uTime;		// "Time", from Animate( )
uniform float	uC;
uniform float	uD;
uniform bool	uT;
uniform bool	uT1;


void
main( )
{
	vec3 Normal = normalize(vN);
	vec3 Light     = normalize(vL);
	vec3 Eye        = normalize(vE);
	vec3 myColor = uColor;
	float T=uSize;
	if(uC==1.){
	if(uT1){
	if(uT){
	T=T+(uTime*0.08);
	}
	else
	{
	T=(T+(1.*0.08))-(uTime*0.08);
	}    //if(uT)
	}   //if(uT1)
	else{
		if(uT){
	T=T+(uTime*0.5);
	}
	else
	{
	T=(T+(1.*0.5))-(uTime*0.5);
	}    //if(uT)
	}
	float ros=(vST.s-uS0)*(vST.s-uS0);
	float rot=(vST.t-uT0)*(vST.t-uT0);
	float ras=T*T;
	float re=ros+rot;
	
	if( re<=ras )
{
myColor = vec3( 1., 0., 0. );
}
	}  //if(uC==1.)
	

	vec3 ambient = uKa * myColor;

	float d = max( dot(Normal,Light), 0. );       // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * myColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )	          // only do specular if the light can see the point
	{
		vec3 ref = normalize(  reflect( -Light, Normal )  );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * uSpecularColor;
	gl_FragColor = vec4( ambient + diffuse + specular,  1. );
}